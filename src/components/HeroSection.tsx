import Link from "next/link";
import { site } from "@/content/siteContent";
import { CheckIcon } from "@/components/icons";

export function HeroSection() {
  const { hero, contact } = site;
  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
    : hero.cta.whatsapp.href;
  const bookCallHref = contact.bookingUrl || hero.cta.bookCall.href;

  return (
    <section
      className="overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left column: content */}
          <div className="flex flex-col">
            <p className="mb-4 inline-flex w-fit items-center rounded-full border border-[var(--brand-blue)]/30 bg-[var(--brand-blue)]/5 px-4 py-1.5 text-sm font-medium text-[var(--brand-blue)]">
              {hero.badge}
            </p>
            <h1
              id="hero-heading"
              className="text-3xl font-bold tracking-tight text-[var(--brand-black)] sm:text-4xl lg:text-5xl lg:leading-tight"
            >
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-gray-600">
              {hero.subheadline}
            </p>
            <ul className="mt-6 space-y-3" role="list">
              {hero.trustPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={hero.cta.requestQuote.href}
                className="inline-flex justify-center rounded-xl bg-[var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
              >
                {hero.cta.requestQuote.label}
              </Link>
              <Link
                href={bookCallHref}
                className="inline-flex justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-[var(--brand-black)] transition hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                {hero.cta.bookCall.label}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-[var(--brand-red)] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--brand-red-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2"
              >
                {hero.cta.whatsapp.label}
              </a>
            </div>
          </div>

          {/* Right column: decorative panel */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="relative aspect-[4/3] max-h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-blue)]/10 via-gray-100 to-[var(--brand-red)]/10">
              {/* Abstract card stack */}
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="h-full w-full max-w-sm space-y-4">
                  <div className="rounded-xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-sm" style={{ height: "28%" }} />
                  <div className="ml-8 rounded-xl border border-white/60 bg-white/70 shadow-md backdrop-blur-sm" style={{ height: "36%" }} />
                  <div className="ml-4 rounded-xl border border-[var(--brand-blue)]/20 bg-[var(--brand-blue)]/5 shadow-sm" style={{ height: "24%" }} />
                </div>
              </div>
              {/* Gradient orbs */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--brand-blue)]/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[var(--brand-red)]/15 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
