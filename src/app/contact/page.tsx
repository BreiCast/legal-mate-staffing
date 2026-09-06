import { ContactOptions } from "@/components/ContactOptions";
import { ButtonLink, PageIntro, Section } from "@/components/ui/Primitives";
import { company } from "@/content/company";
import { contact } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact Legal Mate",
  "Talk with Legal Mate Staffing about bilingual remote legal staff for your U.S. law firm. Request candidates or contact our team directly.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Let’s talk about your firm"
        title={
          <>
            Good hires start
            <br />
            <em>with a conversation.</em>
          </>
        }
        description="Whether you know exactly who you need or want to work through the role, we’d like to hear about your firm."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="contact-layout">
          <div>
            <h2>A direct line to Legal Mate.</h2>
            <p>{company.legalName}</p>
            <ContactOptions location="contact" />
            {contact.location && <p>{contact.location}</p>}
            <p>
              For staffing inquiries only. Please don’t send confidential case
              documents or sensitive client information.
            </p>
          </div>
          <div className="contact-invite">
            <p className="eyebrow">Ready to start a search?</p>
            <h2>
              Tell us who
              <br />
              <em>your team needs.</em>
            </h2>
            <p>
              Share your name, work email, firm, and the role you’re looking to
              fill. We’ll help define the next step.
            </p>
            <ButtonLink
              href="/request-candidates"
              event="primary_cta_click"
              location="contact"
            >
              Get my candidate shortlist
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
