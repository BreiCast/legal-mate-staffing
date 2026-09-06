import {
  ButtonLink,
  Check,
  PageIntro,
  Section,
} from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Customer Service & Operations Staffing",
  "Bilingual remote customer service, collections, administrative, and operations support, with a role brief built around your organization.",
  "/operations-staffing",
);
export default function OperationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Support beyond the legal team"
        title={
          <>
            The same care.
            <br />
            <em>Across your operations.</em>
          </>
        }
        description="Our core focus is legal staffing. We also help organizations define and fill bilingual customer service, collections, administrative, and general operations roles."
        breadcrumbs={[
          { label: "Legal staffing", href: "/legal-staffing" },
          { label: "Operations support" },
        ]}
      />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>Support for your daily operations</h2>
            <ul>
              <li>
                <Check />
                Customer service and client communication
              </li>
              <li>
                <Check />
                Collections administration and approved follow-up
              </li>
              <li>
                <Check />
                Calendar, inbox, and administrative support
              </li>
              <li>
                <Check />
                Virtual assistant and operations coordination roles
              </li>
            </ul>
            <h2>A brief built around the actual work</h2>
            <p>
              Tell us the responsibilities, working hours, systems, and
              communication skills the role requires. We discuss candidate
              experience, evaluation, and your onboarding needs before proposing
              a search.
            </p>
            <p>
              We review the permitted scope, training needs, and supervision for
              each role with your organization. Pricing and support arrangements
              are defined in your proposal.
            </p>
          </div>
          <aside className="detail-aside">
            <h2>
              Let’s scope
              <br />
              <em>the right support.</em>
            </h2>
            <p>
              Start with the work you need handled. We’ll help clarify the role.
            </p>
            <ButtonLink
              href="/request-candidates?role=Collections%20%2F%20Operations%20Support"
              event="primary_cta_click"
              location="operations"
            >
              Discuss an operations role
            </ButtonLink>
          </aside>
        </div>
      </Section>
      <CTA />
    </>
  );
}
