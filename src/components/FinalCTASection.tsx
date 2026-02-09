import Link from "next/link";
import { site } from "@/content/siteContent";

export function FinalCTASection() {
  const { finalCta, contact } = site;
  const bookCallHref = contact.bookingUrl || finalCta.cta.bookCall.href;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-blue)] via-[var(--brand-blue)]/95 to-[var(--brand-black)] px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* Decorative orbs */}
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-[var(--brand-red)]/15 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100/90">
            {finalCta.subtext}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={finalCta.cta.requestQuote.href}
              className="w-full rounded-xl bg-white px-8 py-3.5 text-center text-base font-semibold text-[var(--brand-blue)] shadow-lg transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-blue)] sm:w-auto"
            >
              {finalCta.cta.requestQuote.label}
            </Link>
            <Link
              href={bookCallHref}
              className="w-full rounded-xl border-2 border-white/30 px-8 py-3.5 text-center text-base font-semibold text-white transition hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-blue)] sm:w-auto"
            >
              {finalCta.cta.bookCall.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
