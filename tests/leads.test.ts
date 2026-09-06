import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import { handleLead, type LeadDependencies } from "../src/lib/leads/handler";
import { leadSchema } from "../src/lib/lead-schema";
import { MemoryLeadStore, RedisLeadStore } from "../src/lib/leads/store";
import { leadEmails } from "../src/lib/leads/email";
import { POST } from "../src/app/api/leads/route";

const fixture = () => ({
  name: "Jane Example",
  email: "jane@example.com",
  firm: "Example Firm",
  role: "Case Manager",
  submissionId: randomUUID(),
  website: "",
  attribution: {
    landingPage: "/roles/case-manager",
    referrer: "https://example.org",
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "legal",
    utm_term: "",
    utm_content: "",
  },
});
const request = (payload: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
function setup(options: Partial<LeadDependencies> = {}) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const logs: Record<string, unknown>[] = [];
  const deps: LeadDependencies = {
    store: new MemoryLeadStore(),
    email: {
      apiKey: "test-only",
      from: "Legal Mate <test@example.com>",
      to: "inbox@example.com",
      bookingUrl: "https://example.com/book",
    },
    hashSecret: "test-secret-not-for-production",
    now: () => new Date("2026-09-06T12:00:00.000Z"),
    fetcher: async (url, init) => {
      calls.push({ url: String(url), init });
      return Response.json({
        data: [{ id: "notification-id" }, { id: "confirmation-id" }],
      });
    },
    log: (entry) => logs.push(entry),
    ...options,
  };
  return { deps, calls, logs };
}

test("normalizes email and accepts the four-field short form", () => {
  const value = leadSchema.parse({ ...fixture(), email: " Jane@Example.COM " });
  assert.equal(value.email, "jane@example.com");
  assert.equal(value.hires, "");
  assert.equal(value.message, "");
});
test("rejects unknown roles, invalid optional choices, long messages, and header injection", () => {
  for (const change of [
    { role: "Hacker" },
    { hires: "1000" },
    { timeline: "Tomorrow" },
    { practiceArea: "Unapproved" },
    { email: "a@b.com\nBcc:bad@example.com" },
    { name: "Jane\r\nBcc" },
    { message: "x".repeat(2001) },
    { submissionId: "not-a-uuid" },
  ])
    assert.equal(
      leadSchema.safeParse({ ...fixture(), ...change }).success,
      false,
    );
});
test("accepts only after both provider IDs exist and preserves attribution", async () => {
  const { deps, calls, logs } = setup();
  const lead = fixture();
  const response = await handleLead(request(lead), deps);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    ok: true,
    reference: lead.submissionId,
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails/batch");
  const batch = JSON.parse(String(calls[0].init?.body));
  assert.equal(batch.length, 2);
  assert.deepEqual(batch[0].to, ["inbox@example.com"]);
  assert.deepEqual(batch[1].to, [lead.email]);
  assert.match(batch[0].text, /utm_source: linkedin/);
  assert.match(batch[0].text, /2026-09-06T12:00:00.000Z/);
  assert.match(batch[1].text, /https:\/\/example.com\/book/);
  assert.equal(
    (calls[0].init?.headers as Record<string, string>)["x-batch-validation"],
    "strict",
  );
  assert.equal(logs[0].event, "lead_accepted");
  assert.ok(!JSON.stringify(logs).includes(lead.email));
  assert.ok(!JSON.stringify(logs).includes(lead.firm));
});
test("does not return success on provider rejection, malformed acceptance, partial acceptance, or network failure", async () => {
  const replies = [
    async () => Response.json({ error: "denied" }, { status: 403 }),
    async () => Response.json({ data: [{ id: "one" }] }),
    async () => Response.json({ data: [{ id: "one" }, { id: null }] }),
    async () =>
      Response.json({
        data: [{ id: "one" }, { id: "two" }],
        errors: [{ message: "failed" }],
      }),
    async () => {
      throw new Error("network unavailable");
    },
  ];
  for (const fetcher of replies) {
    const { deps } = setup({ fetcher });
    const response = await handleLead(request(fixture()), deps);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  }
});
test("invalid fields receive accessible field errors without delivery", async () => {
  const { deps, calls } = setup();
  const response = await handleLead(
    request({ ...fixture(), email: "invalid", role: "" }),
    deps,
  );
  assert.equal(response.status, 422);
  const result = await response.json();
  assert.ok(result.fieldErrors.email);
  assert.ok(result.fieldErrors.role);
  assert.equal(calls.length, 0);
});
test("honeypot rejects rather than showing false success", async () => {
  const { deps, calls } = setup();
  const response = await handleLead(
    request({ ...fixture(), website: "spam" }),
    deps,
  );
  assert.equal(response.status, 422);
  assert.equal((await response.json()).ok, false);
  assert.equal(calls.length, 0);
});
test("rejects foreign or missing origins and unsupported content types", async () => {
  for (const headers of [
    { origin: "https://evil.example" },
    { origin: "" },
    { "content-type": "text/plain" },
  ] as Record<string, string>[]) {
    const { deps, calls } = setup();
    const response = await handleLead(request(fixture(), headers), deps);
    assert.ok([403, 415].includes(response.status));
    assert.equal(calls.length, 0);
  }
});
test("bounds bodies with and without a Content-Length header", async () => {
  for (const headers of [{ "content-length": "20000" }, {}] as Record<
    string,
    string
  >[]) {
    const { deps, calls } = setup();
    const response = await handleLead(
      request({ ...fixture(), message: "x".repeat(20000) }, headers),
      deps,
    );
    assert.equal(response.status, 413);
    assert.equal(calls.length, 0);
  }
});
test("invalid JSON fails gracefully", async () => {
  const { deps } = setup();
  const req = new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "content-type": "application/json",
    },
    body: "{",
  });
  assert.equal((await handleLead(req, deps)).status, 400);
});
test("email rate limit persists across requests", async () => {
  const { deps, calls } = setup();
  for (let i = 0; i < 3; i++)
    assert.equal((await handleLead(request(fixture()), deps)).status, 201);
  const fourth = await handleLead(request(fixture()), deps);
  assert.equal(fourth.status, 429);
  assert.equal(fourth.headers.get("retry-after"), "3600");
  assert.equal(calls.length, 3);
});
test("IP limit stops address rotation and ignores untrusted forwarding headers", async () => {
  const { deps, calls } = setup();
  for (let i = 0; i < 8; i++)
    assert.equal(
      (
        await handleLead(
          request(
            { ...fixture(), email: `jane${i}@example.com` },
            { "x-forwarded-for": `127.0.0.${i}` },
          ),
          deps,
        )
      ).status,
      201,
    );
  assert.equal(
    (
      await handleLead(
        request(
          { ...fixture(), email: "new@example.com" },
          { "x-forwarded-for": "127.0.0.99" },
        ),
        deps,
      )
    ).status,
    429,
  );
  assert.equal(calls.length, 8);
});
test("rate limit expires after its window", async () => {
  let now = 1000;
  const store = new MemoryLeadStore(() => now);
  assert.equal(await store.increment("a", 10), 1);
  assert.equal(await store.increment("a", 10), 2);
  now = 11001;
  assert.equal(await store.increment("a", 10), 1);
});
test("identical retries reuse provider key, timestamp, and payload", async () => {
  let counter = 0;
  const { deps, calls } = setup({
    now: () => new Date(100000 + counter++ * 1000),
  });
  const lead = fixture();
  await handleLead(request(lead), deps);
  await handleLead(request(lead), deps);
  assert.equal(calls[0].init?.body, calls[1].init?.body);
  assert.equal(
    (calls[0].init?.headers as Record<string, string>)["Idempotency-Key"],
    `staffing/${lead.submissionId}`,
  );
});
test("changed payload with a reused reference is not sent", async () => {
  const { deps, calls } = setup();
  const lead = fixture();
  await handleLead(request(lead), deps);
  const response = await handleLead(
    request({ ...lead, firm: "Changed Firm" }),
    deps,
  );
  assert.equal(response.status, 409);
  assert.equal(calls.length, 1);
});
test("a timeout can be retried without changing the provider payload", async () => {
  const batches: string[] = [];
  let fail = true;
  const { deps } = setup({
    fetcher: async (_url, init) => {
      batches.push(String(init?.body));
      if (fail) {
        fail = false;
        throw new Error("timeout");
      }
      return Response.json({ data: [{ id: "one" }, { id: "two" }] });
    },
  });
  const lead = fixture();
  assert.equal((await handleLead(request(lead), deps)).status, 503);
  assert.equal((await handleLead(request(lead), deps)).status, 201);
  assert.equal(batches[0], batches[1]);
});
test("store failures fail closed without sending", async () => {
  const { deps, calls } = setup({
    store: {
      increment: async () => {
        throw new Error("redis unavailable");
      },
      getOrCreate: async () => "",
    },
  });
  assert.equal((await handleLead(request(fixture()), deps)).status, 503);
  assert.equal(calls.length, 0);
});
test("Redis adapter uses atomic expiration commands and validates its response", async () => {
  const commands: unknown[][] = [];
  const redis = new RedisLeadStore(
    "https://redis.example.com",
    "token",
    async (_url, init) => {
      commands.push(JSON.parse(String(init?.body)));
      return Response.json({ result: commands.length === 1 ? 1 : "stored" });
    },
  );
  assert.equal(await redis.increment("key", 900), 1);
  assert.equal(await redis.getOrCreate("id", "value", 86400), "stored");
  assert.equal(commands[0][0], "EVAL");
  assert.ok(String(commands[0][1]).includes("EXPIRE"));
  assert.ok(String(commands[1][1]).includes("'NX'"));
  const broken = new RedisLeadStore(
    "https://redis.example.com",
    "token",
    async () => Response.json({ error: "bad" }),
  );
  await assert.rejects(broken.increment("key", 1));
});
test("untrusted message content is not reflected into prospect confirmation", () => {
  const lead = leadSchema.parse({
    ...fixture(),
    name: "Visit evil.example",
    message: "Visit https://evil.example for a refund",
  });
  const emails = leadEmails(lead, new Date().toISOString(), setup().deps.email);
  assert.ok(!emails[1].text.includes("evil.example"));
  assert.ok(emails[0].text.includes("evil.example"));
});
test("unconfigured production route never reports successful submission", async () => {
  // This test uses the checkout's intentionally unconfigured delivery environment.
  const original = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const response = await POST(request(fixture()));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  } finally {
    if (original) process.env.RESEND_API_KEY = original;
  }
});
