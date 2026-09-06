import { handleLead } from "@/lib/leads/handler";
import { MemoryLeadStore, RedisLeadStore } from "@/lib/leads/store";
import { contact, siteUrl } from "@/lib/config";

export const runtime = "nodejs";
export const maxDuration = 30;
const developmentStore = new MemoryLeadStore();

export async function POST(request: Request) {
  const {
    RESEND_API_KEY,
    LEAD_FROM_EMAIL,
    LEAD_TO_EMAIL,
    LEAD_HASH_SECRET,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
  } = process.env;
  const redisReady =
    UPSTASH_REDIS_REST_URL?.startsWith("https://") && UPSTASH_REDIS_REST_TOKEN;
  if (
    !RESEND_API_KEY ||
    !LEAD_FROM_EMAIL ||
    !LEAD_TO_EMAIL ||
    !LEAD_HASH_SECRET ||
    (process.env.NODE_ENV === "production" && !redisReady)
  ) {
    console.error(JSON.stringify({ event: "lead_configuration_missing" }));
    return Response.json(
      {
        ok: false,
        error:
          "Online requests are temporarily unavailable. Please try again later or use another contact option below.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  return handleLead(request, {
    store: redisReady
      ? new RedisLeadStore(UPSTASH_REDIS_REST_URL!, UPSTASH_REDIS_REST_TOKEN!)
      : developmentStore,
    email: {
      apiKey: RESEND_API_KEY,
      from: LEAD_FROM_EMAIL,
      to: LEAD_TO_EMAIL,
      bookingUrl: contact.bookingUrl,
    },
    hashSecret: LEAD_HASH_SECRET,
    siteOrigin: siteUrl,
    ipHeader: process.env.VERCEL
      ? "x-vercel-forwarded-for"
      : process.env.LEAD_TRUSTED_IP_HEADER,
  });
}
