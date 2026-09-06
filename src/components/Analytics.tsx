"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsConfig } from "@/lib/config";
import { captureAttribution } from "@/lib/attribution";
import { localStorageAllowed, trackEvent } from "@/lib/analytics";

export function Analytics() {
  const [consent, setConsent] = useState<"pending" | "accepted" | "declined">(
    "declined",
  );
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
    if (analyticsConfig.gaId) {
      let initial: "pending" | "accepted" | "declined" = "pending";
      try {
        initial = localStorageAllowed()
          ? "accepted"
          : localStorage.getItem("legal-mate-analytics-consent") ===
                "declined" || navigator.doNotTrack === "1"
            ? "declined"
            : "pending";
      } catch {
        initial = "declined";
      }
      // Synchronizing external consent storage after mount avoids an SSR mismatch.
      queueMicrotask(() => setConsent(initial));
    }
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-event]");
      if (target?.dataset.event)
        trackEvent(target.dataset.event, {
          location: target.dataset.location ?? "page",
          ...(target.dataset.profile
            ? { profile: target.dataset.profile }
            : {}),
        });
    }
    function settings() {
      setConsent("pending");
    }
    document.addEventListener("click", click);
    window.addEventListener("legal-mate:privacy-settings", settings);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("legal-mate:privacy-settings", settings);
    };
  }, []);
  useEffect(() => {
    if (ready && consent === "accepted")
      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}`,
      });
  }, [pathname, ready, consent]);
  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem("legal-mate-analytics-consent", value);
    } catch {
      /* Consent storage is optional. */
    }
    setConsent(value);
    if (analyticsConfig.gaId) {
      (window as unknown as Record<string, unknown>)[
        `ga-disable-${analyticsConfig.gaId}`
      ] = value !== "accepted";
    }
    window.gtag?.("consent", "update", {
      analytics_storage: value === "accepted" ? "granted" : "denied",
    });
  }
  return (
    <>
      {analyticsConfig.gaId && consent === "accepted" && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
          strategy="afterInteractive"
          onReady={() => {
            window.dataLayer = window.dataLayer || [];
            // GA’s queue expects an Arguments object, not an array.
            window.gtag = function () {
              // eslint-disable-next-line prefer-rest-params
              window.dataLayer?.push(arguments);
            };
            window.gtag("js", new Date());
            window.gtag("consent", "default", {
              analytics_storage: "granted",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
            window.gtag("config", analyticsConfig.gaId, {
              send_page_view: false,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              page_location: `${window.location.origin}${window.location.pathname}`,
              page_referrer: "",
            });
            setReady(true);
          }}
        />
      )}
      {analyticsConfig.gaId && consent === "pending" && (
        <aside className="consent-banner" aria-label="Analytics preferences">
          <p>
            Help us understand what’s useful. Allow optional analytics?{" "}
            <Link href="/privacy">Privacy details</Link>
          </p>
          <div>
            <button onClick={() => choose("declined")}>Decline</button>
            <button onClick={() => choose("accepted")}>Allow analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}

export function PrivacySettings() {
  if (!analyticsConfig.gaId)
    return <p>Optional analytics is not enabled on this site.</p>;
  return (
    <button
      className="button button-secondary"
      onClick={() =>
        window.dispatchEvent(new Event("legal-mate:privacy-settings"))
      }
    >
      Change analytics preference
    </button>
  );
}
