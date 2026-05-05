import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

interface CtaBandProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CtaBand({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
}: CtaBandProps = {}) {
  const { editorial, hero, contact } = site;
  const fallbackBookCallHref = contact.bookingUrl || hero.cta.bookCall.href;

  const eyebrowText = eyebrow ?? editorial.cta.eyebrow;
  const headingText = heading ?? editorial.cta.heading;
  const bodyText = body ?? editorial.cta.body;
  const primary = primaryCta ?? {
    label: hero.cta.requestQuote.label,
    href: hero.cta.requestQuote.href,
  };
  const secondary = secondaryCta ?? {
    label: "Book a 20-min call",
    href: fallbackBookCallHref,
  };

  return (
    <section
      className="bg-ink py-24 text-paper sm:py-32"
      aria-labelledby="cta-heading"
    >
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow className="text-paper/60">
              <span className="text-paper/40">/</span>
              <span className="text-paper/80">{eyebrowText}</span>
            </Eyebrow>
            <h2
              id="cta-heading"
              className="mt-6 font-serif text-[36px] leading-[1.08] tracking-[-0.01em] text-paper sm:text-[52px] lg:text-[60px]"
            >
              {headingText}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-paper/70">
              {bodyText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-5 md:justify-end">
            <ButtonLink
              href={primary.href}
              size="lg"
              variant="inverse"
              withArrow
            >
              {primary.label}
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              size="lg"
              variant="ghost"
              className="text-paper hover:bg-paper/[0.06]"
              withArrow
            >
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
