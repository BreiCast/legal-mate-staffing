import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const { hero, contact } = site;
  const bookCallHref = contact.bookingUrl || hero.cta.bookCall.href;
  const brief = hero.sampleBrief;

  return (
    <section
      className="relative overflow-hidden bg-paper pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32"
      aria-labelledby="hero-heading"
    >
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left — content */}
          <div className="lg:col-span-7">
            <p
              className="headline-line mb-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
              style={{ animationDelay: "0ms" }}
            >
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.kicker}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-[40px] font-normal leading-[1.04] tracking-[-0.015em] text-ink sm:text-[58px] lg:text-[68px]"
            >
              <span className="headline-line block" style={{ animationDelay: "80ms" }}>
                Remote legal teams,
              </span>
              <span className="headline-line block" style={{ animationDelay: "160ms" }}>
                built like your
              </span>
              <span
                className="headline-line block italic text-ink/90"
                style={{ animationDelay: "240ms" }}
              >
                best in-house hire.
              </span>
            </h1>

            <p
              className="headline-line mt-7 max-w-xl text-[17px] leading-[1.55] text-muted-strong sm:text-[18px]"
              style={{ animationDelay: "360ms" }}
            >
              {hero.subheadlineEditorial}
            </p>

            <div
              className="headline-line mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{ animationDelay: "440ms" }}
            >
              <ButtonLink
                href={hero.cta.requestQuote.href}
                size="lg"
                variant="primary"
                withArrow
              >
                {hero.cta.requestQuote.label}
              </ButtonLink>
              <ButtonLink
                href={bookCallHref}
                size="lg"
                variant="ghost"
                withArrow
              >
                Book a 20-min intro call
              </ButtonLink>
            </div>

            <ul
              className="headline-line mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:gap-x-6"
              style={{ animationDelay: "520ms" }}
              role="list"
            >
              {hero.metaStrip.map((item, i) => (
                <li key={item} className="flex items-center gap-5">
                  <span>{item}</span>
                  {i < hero.metaStrip.length - 1 && (
                    <span aria-hidden className="hidden h-px w-6 bg-line-strong sm:inline-block" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — candidate brief mockup */}
          <div
            className="headline-line relative lg:col-span-5"
            style={{ animationDelay: "320ms" }}
            aria-hidden
          >
            <div className="relative">
              {/* Subtle backdrop, replaces gradient orbs */}
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-line/40 via-paper to-paper" />

              <div className="relative rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(10,10,10,0.04),0_24px_48px_-24px_rgba(10,10,10,0.10)]">
                {/* Header strip */}
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-line-strong" />
                    <span className="h-2 w-2 rounded-full bg-line-strong" />
                    <span className="h-2 w-2 rounded-full bg-line-strong" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {brief.label}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Candidate · CM-0421
                      </p>
                      <p className="mt-2 font-serif text-[26px] leading-[1.1] text-ink">
                        {brief.name}
                      </p>
                      <p className="mt-1 text-[14px] text-muted-strong">{brief.role}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {brief.availability}
                    </span>
                  </div>

                  <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { k: "Languages", v: brief.languages },
                      { k: "Experience", v: brief.experience },
                      { k: "Location", v: brief.location },
                      { k: "Tools", v: brief.tools.join(" · ") },
                    ].map((row) => (
                      <div key={row.k} className="border-t border-line pt-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          {row.k}
                        </dt>
                        <dd className="mt-1 text-[14px] text-ink">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Vetted · Reference checked
                    </span>
                    <span className="text-[12px] font-medium text-ink">
                      Ready to interview →
                    </span>
                  </div>
                </div>
              </div>

              {/* Anchored secondary card to add quiet depth */}
              <div className="absolute -bottom-7 -left-6 hidden w-56 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_1px_2px_rgba(10,10,10,0.04),0_16px_32px_-20px_rgba(10,10,10,0.10)] sm:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  This week
                </p>
                <p className="mt-1 text-[14px] text-ink">
                  <span className="font-serif text-[22px] leading-none">12</span>
                  <span className="ml-1.5 text-muted-strong">candidates shortlisted</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
