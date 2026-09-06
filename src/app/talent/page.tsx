import {
  TalentSection,
  ProcessSection,
} from "@/components/marketing/HomeSections";
import { PageIntro } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Example Legal Candidate Profiles",
  "Explore illustrative case manager, intake specialist, and paralegal profiles. Request a search tailored to the experience and workflows your law firm needs.",
  "/talent",
);
export default function TalentPage() {
  return (
    <>
      <PageIntro
        eyebrow="A clearer picture of your next hire"
        title={
          <>
            The right profile
            <br />
            <em>starts with your firm.</em>
          </>
        }
        description="These example candidate profiles illustrate possible role briefs. They are not real candidates or a live availability list. Actual experience, software proficiency, and schedules are reviewed during your search."
        breadcrumbs={[{ label: "Example profiles" }]}
      />
      <TalentSection />
      <ProcessSection />
      <CTA />
    </>
  );
}
