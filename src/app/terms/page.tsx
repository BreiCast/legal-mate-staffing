import Link from "next/link";
import { PageIntro, Section } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Website Terms",
  "Website information, candidate illustrations, and the relationship between Legal Mate Staffing’s website and a written staffing agreement.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Website terms"
        title={
          <>
            Clear information.
            <br />
            <em>Clear expectations.</em>
          </>
        }
        description="These terms explain the purpose and limitations of information on the Legal Mate Staffing LLC website."
        breadcrumbs={[{ label: "Terms" }]}
      />
      <Section>
        <div className="prose">
          <h2>Website information</h2>
          <p>
            This website describes staffing services and possible support roles.
            Content is general information, not a staffing agreement, employment
            offer, or legal advice. Submitting a request does not create an
            obligation to hire or supply a particular candidate.
          </p>
          <h2>Candidate examples and availability</h2>
          <p>
            Profiles labeled “Example candidate profile” are illustrations of a
            role brief. They are not live candidate listings. Skills,
            availability, schedules, and individual qualifications must be
            reviewed during an actual search.
          </p>
          <h2>Written staffing terms</h2>
          <p>
            Pricing, scope of work, administration, start dates, support,
            confidentiality obligations, and any replacement provisions must be
            agreed in a written staffing agreement. Website content does not
            create a guarantee of timing, results, savings, or placement.
          </p>
          <h2>Professional supervision</h2>
          <p>
            Remote staff support firm workflows under appropriate supervision.
            Your firm determines which responsibilities may be delegated,
            provides suitable access and procedures, and retains responsibility
            for its legal services. Staff do not independently provide U.S.
            legal advice unless legally authorized.
          </p>
          <h2>Responsible use</h2>
          <p>
            Use the website for legitimate inquiries. Do not submit another
            person’s contact information without authorization, send
            confidential case materials, or attempt to interfere with the
            website or its services.
          </p>
          <h2>External providers</h2>
          <p>
            Booking, messaging, social, and other external services are operated
            by their respective providers. Their terms apply when you choose to
            use them.
          </p>
          <h2>Questions</h2>
          <p>
            <Link href="/contact">Contact Legal Mate</Link> to clarify service
            details. For information about inquiry data and optional analytics,
            read our <Link href="/privacy">privacy notice</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
