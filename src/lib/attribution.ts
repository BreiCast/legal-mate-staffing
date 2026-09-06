import type { Attribution } from "./lead-schema";

const storageKey = "legal-mate-attribution-v1";
const empty: Attribution = {
  landingPage: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return empty;
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved) as Attribution;
  } catch {
    /* Private browsing and disabled storage should not block a lead. */
  }
  const params = new URLSearchParams(window.location.search);
  const value = {
    ...empty,
    landingPage: window.location.pathname.slice(0, 500),
    referrer: "",
  };
  try {
    value.referrer = document.referrer ? new URL(document.referrer).origin : "";
  } catch {
    /* Ignore invalid referrers. */
  }
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ] as const) {
    value[key] = (params.get(key) ?? "")
      .replace(/[\u0000-\u001f\u007f]/g, "")
      .slice(0, 150);
  }
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    /* Storage is optional. */
  }
  return value;
}
