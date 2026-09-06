import {
  ProcessSection,
  WorkflowSection,
} from "@/components/marketing/HomeSections";
import { PageIntro, Section, ButtonLink } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "How Legal Staffing Works",
  "From a clear role brief to candidate interviews, onboarding, and ongoing support. Understand Legal Mate’s remote legal staffing process.",
  "/process",
);
export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title={
          <>
            A clear search.
            <br />
            <em>A considered hire.</em>
          </>
        }
        description="You bring the need. We bring a practical understanding of legal support, a focused search, and help with the details along the way."
        breadcrumbs={[{ label: "How it works" }]}
      />
      <ProcessSection />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>What happens behind your shortlist</h2>
            <ol className="numbered-list">
              <li>
                <h3>Role-specific screening</h3>
                <p>
                  We review relevant work experience and evaluate the
                  responsibilities in your brief. Language ability and
                  professional communication are part of the conversation.
                </p>
              </li>
              <li>
                <h3>Experience review</h3>
                <p>
                  We discuss candidates’ prior responsibilities, tools, and
                  working environments. Any additional reference, background, or
                  credential checks are scoped with your firm.
                </p>
              </li>
              <li>
                <h3>Interviews you can use</h3>
                <p>
                  You meet the candidates, assess fit, and make the hiring
                  decision. We coordinate interviews and help keep the search
                  organized.
                </p>
              </li>
              <li>
                <h3>A defined working relationship</h3>
                <p>
                  Before a start date is agreed, confirm pricing, schedule,
                  duties, support arrangements, and any replacement provisions
                  in writing.
                </p>
              </li>
            </ol>
          </div>
          <aside className="detail-aside">
            <h2>A useful first brief</h2>
            <p>
              You don’t need every detail worked out. These are good starting
              points:
            </p>
            <ul>
              <li>The work you want to hand over</li>
              <li>Practice area and case volume</li>
              <li>Required English / Spanish communication</li>
              <li>Software, schedule, and supervision</li>
              <li>Budget and preferred start timeline</li>
            </ul>
            <ButtonLink
              href="/request-candidates"
              event="primary_cta_click"
              location="process"
            >
              Tell us what you need
            </ButtonLink>
          </aside>
        </div>
      </Section>
      <WorkflowSection />
      <FAQ />
      <CTA />
    </>
  );
}
