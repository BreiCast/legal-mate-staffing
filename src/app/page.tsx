import {
  Hero,
  TrustStrip,
  ValueSection,
  RolesSection,
  PracticeAreasSection,
  ProcessSection,
  FoundersSection,
  TalentSection,
  WorkflowSection,
  EconomicsSection,
  ConfidentialitySection,
  VerifiedProof,
} from "@/components/marketing/HomeSections";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Bilingual Legal Staffing for U.S. Law Firms",
  company.description,
  "/",
);
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ValueSection />
      <RolesSection />
      <PracticeAreasSection />
      <FoundersSection />
      <ProcessSection />
      <TalentSection />
      <WorkflowSection />
      <EconomicsSection />
      <ConfidentialitySection />
      <VerifiedProof />
      <FAQ />
      <CTA />
    </>
  );
}
