import { BookingLink } from "@/components/BookingLink";
import { ButtonLink, Mark, Section } from "@/components/ui/Primitives";

export function CTA() {
  return (
    <Section className="cta-section">
      <div className="cta-inner">
        <div>
          <p className="eyebrow">Let’s build your team</p>
          <h2>
            Good people.
            <br />
            <em>A stronger firm.</em>
          </h2>
          <p>
            Tell us who you need. We’ll help you find the legal talent to move
            your firm forward.
          </p>
          <div className="button-row">
            <ButtonLink
              href="/request-candidates"
              variant="light"
              event="primary_cta_click"
              location="final"
            >
              Get my candidate shortlist
            </ButtonLink>
            <BookingLink location="final" variant="text" />
          </div>
        </div>
        <Mark className="cta-mark" />
      </div>
    </Section>
  );
}
