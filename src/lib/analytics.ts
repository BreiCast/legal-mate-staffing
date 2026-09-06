type AnalyticsValue = string | number | boolean;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  properties: Record<string, AnalyticsValue> = {},
) {
  if (typeof window === "undefined") return;
  // Never send form values, email addresses, query strings, or referrers here.
  window.dispatchEvent(
    new CustomEvent("legal-mate:analytics", {
      detail: { event: name, ...properties },
    }),
  );
  if (localStorageAllowed()) window.gtag?.("event", name, properties);
}

export function localStorageAllowed() {
  try {
    return (
      localStorage.getItem("legal-mate-analytics-consent") === "accepted" &&
      navigator.doNotTrack !== "1"
    );
  } catch {
    return false;
  }
}
