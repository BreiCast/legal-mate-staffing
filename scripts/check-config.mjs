const problems = [];
const missing = ["NEXT_PUBLIC_SITE_URL", "RESEND_API_KEY", "LEAD_FROM_EMAIL", "LEAD_TO_EMAIL", "LEAD_HASH_SECRET", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].filter(key => !process.env[key]?.trim());
for (const key of missing) problems.push(`${key} is missing`);
for (const key of ["NEXT_PUBLIC_SITE_URL", "UPSTASH_REDIS_REST_URL", "NEXT_PUBLIC_BOOKING_URL", "NEXT_PUBLIC_LINKEDIN_URL"]) {
  if (!process.env[key]) continue;
  try {
    const url = new URL(process.env[key]);
    if (url.protocol !== "https:" || url.username || url.password || url.hostname === "example.com" || url.hostname === "localhost") throw new Error();
    if (key === "NEXT_PUBLIC_SITE_URL" && (url.pathname !== "/" || url.search || url.hash)) problems.push(`${key} must be the canonical origin, without a path or query`);
  } catch { problems.push(`${key} must be an approved public HTTPS URL`); }
}
if (process.env.LEAD_HASH_SECRET && process.env.LEAD_HASH_SECRET.length < 32) problems.push("LEAD_HASH_SECRET must contain at least 32 random characters");
for (const key of ["LEAD_TO_EMAIL", "NEXT_PUBLIC_CONTACT_EMAIL"]) if (process.env[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env[key])) problems.push(`${key} must contain one valid email address`);
if (process.env.LEAD_FROM_EMAIL && !/^(?:[^<>\r\n]+ <)?[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>?$/.test(process.env.LEAD_FROM_EMAIL)) problems.push("LEAD_FROM_EMAIL must be a verified sender address, optionally with a display name");
if (process.env.NEXT_PUBLIC_GA_ID && !/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID)) problems.push("NEXT_PUBLIC_GA_ID must be a GA4 measurement ID");
if (problems.length) { console.error("Launch configuration is incomplete:\n" + problems.map(problem => `- ${problem}`).join("\n")); process.exitCode = 1; }
else console.log("Required configuration is present and syntactically valid. Verify DNS, email delivery, and the actual booking flow before launch.");
if (!process.env.NEXT_PUBLIC_BOOKING_URL) console.log("Booking is not configured; booking links are hidden.");
