import { LeadForm } from "@/components/LeadForm";
import { ContactOptions } from "@/components/ContactOptions";
import {
  Breadcrumbs,
  Check,
  Container,
  Eyebrow,
} from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Request Your Legal Candidate Shortlist",
  "Tell us who your firm needs. Request vetted bilingual case managers, paralegals, intake specialists, and legal support professionals.",
  "/request-candidates",
);
export default async function RequestCandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; practice?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="request-section">
      <Container>
        <Breadcrumbs items={[{ label: "Find legal staff" }]} />
        <div className="request-layout">
          <div className="request-copy">
            <Eyebrow>Your next team member starts here</Eyebrow>
            <h1>
              Tell us the role.
              <br />
              <em>
                We’ll help find
                <br />
                the person.
              </em>
            </h1>
            <p>
              A stronger legal team starts with understanding what you need.
              Share a few details and we’ll begin the conversation.
            </p>
          </div>
          <LeadForm
            initialRole={typeof params.role === "string" ? params.role : ""}
            initialPractice={
              typeof params.practice === "string" ? params.practice : ""
            }
          />
          <aside
            className="request-support"
            aria-label="Staffing support and contact"
          >
            <ul className="check-list">
              <li>
                <Check />
                Bilingual English / Spanish professionals
              </li>
              <li>
                <Check />
                Screening informed by legal operations experience
              </li>
              <li>
                <Check />A search shaped around your firm’s workflows
              </li>
              <li>
                <Check />
                Clear next steps and a tailored proposal
              </li>
            </ul>
            <ContactOptions location="request_candidates" />
          </aside>
        </div>
      </Container>
    </section>
  );
}
