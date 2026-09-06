export function safeHttpsUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password)
      return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

const configuredSiteUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const siteUrl = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : "http://localhost:3000";
export const isIndexable =
  Boolean(configuredSiteUrl) && process.env.VERCEL_ENV !== "preview";
const email =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@legalmatestaffing.com";
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "");

export const contact = {
  email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined,
  phone: phone && /^\+?[\d\s().-]{7,24}$/.test(phone) ? phone : undefined,
  whatsapp:
    whatsapp && /^\d{8,15}$/.test(whatsapp)
      ? `https://wa.me/${whatsapp}`
      : undefined,
  bookingUrl: safeHttpsUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
  linkedin: safeHttpsUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION?.trim() || undefined,
};

export const analyticsConfig = {
  gaId: /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? "")
    ? process.env.NEXT_PUBLIC_GA_ID
    : undefined,
};
