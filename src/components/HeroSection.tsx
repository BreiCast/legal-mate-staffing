import Link from "next/link";
import Image from "next/image";
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
      className="overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 sm:py-24 lg:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left column: content */}
          <div className="flex flex-col hero-animate-in">
            <p className="mb-5 inline-flex w-fit items-center rounded-full border border-[var(--brand-blue)]/25 bg-[var(--brand-blue)]/8 px-4 py-2 text-sm font-medium text-[var(--brand-blue)] shadow-sm">
              {hero.badge}
            </p>
            <h1
              id="hero-heading"
              className="text-3xl font-bold tracking-tight text-[var(--brand-black)] sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-tight"
            >
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-gray-600 leading-relaxed">
              {hero.subheadline}
            </p>
            <ul className="mt-7 space-y-4" role="list">
              {hero.trustPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={hero.cta.requestQuote.href}
                className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-xl bg-[var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-[var(--brand-blue-light)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
              >
                {hero.cta.requestQuote.label}
              </Link>
              <Link
                href={bookCallHref}
                className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-[var(--brand-black)] transition hover:scale-[1.02] hover:border-gray-400 hover:bg-gray-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                {hero.cta.bookCall.label}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-xl bg-[var(--brand-red)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-[var(--brand-red-light)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2"
              >
                {hero.cta.whatsapp.label}
              </a>
            </div>
          </div>

          {/* Right column: team image + floating cards */}
          <div className="relative hidden lg:block hero-animate-in-delay" aria-hidden>
            <div className="relative aspect-[4/3] max-h-[420px] overflow-hidden rounded-2xl border border-white/60 shadow-xl transition-shadow hover:shadow-2xl">
              <Image
                src="/team.jpg"
                alt="Legal Mate Staffing team"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 0px"
                priority
              />
              <div className="absolute inset-5 flex flex-col justify-center gap-4 pointer-events-none">
                <div className="hero-float-card-1 rounded-xl border border-[var(--brand-blue)]/15 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl hover:scale-[1.02] pointer-events-auto will-change-transform">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue)]">Active placements</p>
                  <p className="mt-1 text-sm font-medium text-[var(--brand-black)]">Case managers · Intake · Paralegals</p>
                </div>
                <div className="hero-float-card-2 ml-6 rounded-xl border border-[var(--brand-blue)]/10 bg-white/90 px-5 py-4 shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg hover:scale-[1.02] pointer-events-auto will-change-transform">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Vetted talent</p>
                  <p className="mt-1 text-sm font-medium text-[var(--brand-black)]">Ready to deploy · Bilingual · U.S. workflows</p>
                </div>
                <div className="hero-float-card-3 ml-3 rounded-xl border border-white/80 bg-[var(--brand-blue)]/5 px-5 py-3 shadow-sm transition-shadow hover:shadow-md hover:scale-[1.02] pointer-events-auto will-change-transform">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue)]">Scale</p>
                  <p className="mt-1 text-sm text-gray-700">One hire to full remote teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
