import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBand() {
  const { editorial, hero, contact } = site;
  const bookCallHref = contact.bookingUrl || hero.cta.bookCall.href;

  return (
    <section className="bg-ink py-24 text-paper sm:py-32" aria-labelledby="cta-heading">
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow className="text-paper/60">
              <span className="text-paper/40">/</span>
              <span className="text-paper/80">{editorial.cta.eyebrow}</span>
            </Eyebrow>
            <h2
              id="cta-heading"
              className="mt-6 font-serif text-[36px] leading-[1.08] tracking-[-0.01em] text-paper sm:text-[52px] lg:text-[60px]"
            >
              {editorial.cta.heading}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-paper/70">
              {editorial.cta.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-5 md:justify-end">
            <ButtonLink
              href={hero.cta.requestQuote.href}
              size="lg"
              variant="inverse"
              withArrow
            >
              {hero.cta.requestQuote.label}
            </ButtonLink>
            <ButtonLink
              href={bookCallHref}
              size="lg"
              variant="ghost"
              className="text-paper hover:bg-paper/[0.06]"
              withArrow
            >
              Book a 20-min call
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
