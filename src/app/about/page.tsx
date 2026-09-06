import {
  FoundersSection,
  ConfidentialitySection,
} from "@/components/marketing/HomeSections";
import { PageIntro, Section } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Built by Legal Operators",
  "Meet the founders of Legal Mate Staffing and the U.S. legal operations experience behind our approach to bilingual remote staffing.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title={
          <>
            Legal staffing, with
            <br />
            <em>an inside perspective.</em>
          </>
        }
        description="A job description tells you the responsibilities. Doing the work teaches you what a good hire actually looks like."
        breadcrumbs={[{ label: "Our story" }]}
      />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>Our experience is the starting point.</h2>
            <p>
              André Rodriguez Leones and Henry Andrés Sánchez Martínez built
              Legal Mate after working in legal operations supporting U.S.
              organizations. They saw the difference that consistent
              follow-through, accurate documentation, and thoughtful client
              communication make to a team.
            </p>
            <p>
              That experience became the foundation of the business: understand
              the work first, then look for the person who can do it well.
            </p>
            <h2>A considered search, from the start.</h2>
            <p>
              We learn how your firm works, clarify the responsibilities you
              want to delegate, and evaluate bilingual LATAM professionals
              against that brief. The aim is a dedicated team member who fits
              your operation and communicates clearly with the people around
              them.
            </p>
          </div>
          <aside className="detail-aside">
            <h2>What guides the work</h2>
            <ul>
              <li>Understand the role beyond the title.</li>
              <li>Evaluate communication alongside technical ability.</li>
              <li>Be clear about experience and expectations.</li>
              <li>Respect the people on both sides of a placement.</li>
              <li>Stay involved as the working relationship develops.</li>
            </ul>
          </aside>
        </div>
      </Section>
      <FoundersSection full />
      <ConfidentialitySection />
      <CTA />
    </>
  );
}
