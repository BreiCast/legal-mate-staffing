import { createHmac } from "node:crypto";
import { leadSchema, type LeadResult } from "../lead-schema";
import { sendLeadEmails, type EmailConfig } from "./email";
import type { LeadStore } from "./store";

export type LeadDependencies = {
  store: LeadStore;
  email: EmailConfig;
  hashSecret: string;
  siteOrigin?: string;
  fetcher?: typeof fetch;
  now?: () => Date;
  ipHeader?: string;
  log?: (entry: Record<string, unknown>) => void;
};
const maximumBytes = 16_384;
function json(
  body: LeadResult,
  status: number,
  extra: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

async function readBoundedBody(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > maximumBytes)
    throw new Error("payload_too_large");
  if (!request.body) return "";
  const reader = request.body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBytes) {
        await reader.cancel();
        throw new Error("payload_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function handleLead(request: Request, deps: LeadDependencies) {
  const log = deps.log ?? ((entry) => console.info(JSON.stringify(entry)));
  const origin = request.headers.get("origin");
  if (
    !origin ||
    (origin !== new URL(request.url).origin && origin !== deps.siteOrigin)
  ) {
    return json(
      { ok: false, error: "Please submit your request from this website." },
      403,
    );
  }
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return json(
      { ok: false, error: "Please refresh the form and try again." },
      415,
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(await readBoundedBody(request));
  } catch (error) {
    return json(
      {
        ok: false,
        error:
          "The request could not be read. Please shorten your message and try again.",
      },
      error instanceof Error && error.message === "payload_too_large"
        ? 413
        : 400,
    );
  }
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success)
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      422,
    );
  const lead = parsed.data;
  if (lead.website)
    return json(
      {
        ok: false,
        error: "Your request could not be verified. Please try again.",
      },
      422,
    );

  const hash = (value: string) =>
    createHmac("sha256", deps.hashSecret).update(value).digest("hex");
  // Only use a forwarding header explicitly controlled by the deployment proxy.
  const ip = deps.ipHeader
    ? request.headers.get(deps.ipHeader)?.split(",")[0]?.trim().slice(0, 100) ||
      "unknown"
    : "unknown";
  try {
    const limits = await Promise.all([
      deps.store.increment(`lm:rate:ip:${hash(ip)}`, 900),
      deps.store.increment(`lm:rate:email:${hash(lead.email)}`, 3600),
      deps.store.increment("lm:rate:global", 3600),
    ]);
    if (limits[0] > 8 || limits[1] > 3 || limits[2] > 100) {
      log({ event: "lead_rate_limited", reference: lead.submissionId });
      return json(
        {
          ok: false,
          error:
            "Too many requests. Please try again in an hour or use another contact option.",
        },
        429,
        { "Retry-After": "3600" },
      );
    }
    const fingerprint = hash(JSON.stringify(lead));
    const proposed = {
      fingerprint,
      receivedAt: (deps.now?.() ?? new Date()).toISOString(),
    };
    const stored = JSON.parse(
      await deps.store.getOrCreate(
        `lm:request:${lead.submissionId}`,
        JSON.stringify(proposed),
        86_400,
      ),
    );
    if (stored.fingerprint !== fingerprint)
      return json(
        {
          ok: false,
          error: "This request has changed. Please submit it again.",
        },
        409,
      );
    const emailIds = await sendLeadEmails(
      lead,
      stored.receivedAt,
      deps.email,
      deps.fetcher,
    );
    // Provider acceptance is the conversion boundary. IDs allow delivery tracing.
    log({
      event: "lead_accepted",
      reference: lead.submissionId,
      receivedAt: stored.receivedAt,
      emailIds,
    });
    return json({ ok: true, reference: lead.submissionId }, 201);
  } catch (error) {
    log({
      event: "lead_failed",
      reference: lead.submissionId,
      reason:
        error instanceof Error && /^email_provider_\d+$/.test(error.message)
          ? error.message
          : "dependency_unavailable",
    });
    return json(
      {
        ok: false,
        error:
          "We couldn’t confirm receipt of your request. Your details are still here. Please try again, or use another contact option.",
      },
      503,
      { "Retry-After": "30" },
    );
  }
}
