import { site } from "@/content/siteContent";
import { CtaBand } from "@/components/marketing/CtaBand";

export function FinalCTASection() {
  const { finalCta, contact } = site;
  const bookCallHref = contact.bookingUrl || finalCta.cta.bookCall.href;

  return (
    <CtaBand
      heading={finalCta.headline}
      body={finalCta.subtext}
      primaryCta={{
        label: finalCta.cta.requestQuote.label,
        href: finalCta.cta.requestQuote.href,
      }}
      secondaryCta={{
        label: finalCta.cta.bookCall.label,
        href: bookCallHref,
      }}
    />
  );
}
