export interface LeadStore {
  increment(key: string, windowSeconds: number): Promise<number>;
  getOrCreate(key: string, value: string, ttl: number): Promise<string>;
}

// Only keyed HMACs, a timestamp, and idempotency metadata are stored in Redis.
// Lead content goes to the configured business inbox through Resend.
export class RedisLeadStore implements LeadStore {
  constructor(
    private url: string,
    private token: string,
    private fetcher: typeof fetch = fetch,
  ) {}
  private async command(args: (string | number)[]) {
    const response = await this.fetcher(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("lead_store_unavailable");
    const data = await response.json();
    if (data.error) throw new Error("lead_store_error");
    return data.result as unknown;
  }
  async increment(key: string, windowSeconds: number) {
    const count = await this.command([
      "EVAL",
      "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return n",
      1,
      key,
      windowSeconds,
    ]);
    if (typeof count !== "number")
      throw new Error("lead_store_invalid_response");
    return count;
  }
  async getOrCreate(key: string, value: string, ttl: number) {
    const result = await this.command([
      "EVAL",
      "redis.call('SET', KEYS[1], ARGV[1], 'NX', 'EX', ARGV[2]); return redis.call('GET', KEYS[1])",
      1,
      key,
      value,
      ttl,
    ]);
    if (typeof result !== "string")
      throw new Error("lead_store_invalid_response");
    return result;
  }
}

export class MemoryLeadStore implements LeadStore {
  private values = new Map<string, { value: string; until: number }>();
  constructor(private now = () => Date.now()) {}
  private read(key: string) {
    for (const [entry, data] of this.values)
      if (data.until <= this.now()) this.values.delete(entry);
    return this.values.get(key);
  }
  async increment(key: string, ttl: number) {
    const stored = this.read(key);
    const count = Number(stored?.value ?? 0) + 1;
    this.values.set(key, {
      value: String(count),
      until: stored?.until ?? this.now() + ttl * 1000,
    });
    return count;
  }
  async getOrCreate(key: string, value: string, ttl: number) {
    const stored = this.read(key);
    if (stored) return stored.value;
    this.values.set(key, { value, until: this.now() + ttl * 1000 });
    return value;
  }
}
