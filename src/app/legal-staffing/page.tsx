import {
  RolesSection,
  PracticeAreasSection,
  ConfidentialitySection,
} from "@/components/marketing/HomeSections";
import { PageIntro } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata, serviceSchema } from "@/lib/seo";
const description =
  "Build your law firm’s support team with bilingual LATAM case managers, paralegals, intake specialists, legal assistants, and more.";
export const metadata = pageMetadata(
  "Remote Legal Staffing for U.S. Law Firms",
  description,
  "/legal-staffing",
);
export default function LegalStaffingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Specialized remote legal staffing"
        title={
          <>
            Legal talent that fits
            <br />
            <em>the work inside your firm.</em>
          </>
        }
        description={description}
        breadcrumbs={[{ label: "Legal staffing" }]}
      />
      <RolesSection />
      <PracticeAreasSection />
      <ConfidentialitySection />
      <FAQ />
      <CTA />
      <StructuredData
        data={serviceSchema(
          "Remote legal staffing",
          description,
          "/legal-staffing",
        )}
      />
    </>
  );
}
