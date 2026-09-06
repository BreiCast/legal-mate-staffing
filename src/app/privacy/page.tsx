import Link from "next/link";
import { PageIntro, Section } from "@/components/ui/Primitives";
import { PrivacySettings } from "@/components/Analytics";
import { contact } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy Notice",
  "How Legal Mate Staffing handles staffing inquiries, contact information, attribution, and optional website analytics.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Your information"
        title={
          <>
            Privacy,
            <br />
            <em>in plain language.</em>
          </>
        }
        description="This notice describes information handled through the Legal Mate Staffing LLC website. It covers staffing inquiries and website use."
        breadcrumbs={[{ label: "Privacy" }]}
      />
      <Section>
        <div className="prose">
          <h2>What you share with us</h2>
          <p>
            When you request candidates, we collect your name, email address,
            firm or company, and requested role. You can optionally provide a
            phone number, number of hires, practice area, timeline, and notes.
            Please do not include sensitive personal information or confidential
            case materials.
          </p>
          <h2>Why we use it</h2>
          <p>
            We use inquiry information to respond to your request, understand
            your staffing needs, prepare a proposal, and coordinate the
            conversation. Submitting an inquiry does not enroll you in a
            marketing mailing list.
          </p>
          <h2>Submission and delivery</h2>
          <p>
            Our website sends inquiry details to our business inbox and a
            confirmation to the address you provide through Resend, an email
            delivery provider. The provider processes message contents and
            delivery information. Provider acceptance confirms receipt by the
            delivery service; individual inbox delivery can still be affected by
            spam filters or bounces.
          </p>
          <p>
            When configured, Upstash Redis stores hashed rate-limit keys and
            request metadata for abuse prevention and duplicate-send protection.
            The rate-limit windows are up to one hour and request metadata
            expires after 24 hours. These records contain a timestamp and keyed
            hashes, not your form’s message content.
          </p>
          <h2>Attribution and technical information</h2>
          <p>
            We record the first landing-page path, referring website origin, and
            campaign tags in your browser’s session storage and include them
            with your inquiry. This helps us understand which channels bring
            relevant inquiries. Campaign values are supplied by the link you
            followed. Avoid putting personal data in campaign URLs.
          </p>
          <p>
            The hosting and email providers may process technical information
            needed to operate their services. Application logs record request
            references, event status, and email identifiers so we can
            troubleshoot delivery; our application does not intentionally log
            your form contents.
          </p>
          <h2>Optional analytics</h2>
          <p>
            If Google Analytics is enabled, we ask before loading it. It helps
            measure page visits and actions such as requesting candidates,
            starting a form, or choosing to book a call. Our custom conversion
            events do not include names, email addresses, phone numbers, or form
            notes. You can decline analytics and still use the website and form.
          </p>
          <PrivacySettings />
          <p>
            We respect the browser’s Do Not Track setting for optional
            analytics. If you previously allowed analytics, you can decline
            further collection using the preference control. Existing analytics
            cookies can be removed through your browser settings.
          </p>
          <h2>Other services and links</h2>
          <p>
            If you choose an external booking, messaging, or social link, that
            provider handles your interaction under its own privacy practices.
            We show only the contact methods configured for this website.
          </p>
          <h2>Retention and requests</h2>
          <p>
            Staffing inquiries and related correspondence are retained in the
            business inbox for follow-up and business records. You may ask about
            access, correction, or deletion of your inquiry information. Any
            legal or contractual retention requirements may affect what can be
            deleted.
          </p>
          <p>
            Contact{" "}
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                data-event="email_click"
                data-location="privacy"
              >
                {contact.email}
              </a>
            ) : (
              <Link href="/contact">our team</Link>
            )}{" "}
            with a privacy request. Include enough information to identify your
            inquiry, and avoid sending sensitive documents. We may need to
            verify that the request relates to you.
          </p>
        </div>
      </Section>
    </>
  );
}
