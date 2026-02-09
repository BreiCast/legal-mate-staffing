import { site } from "@/content/siteContent";
import { ProcessStepsSection } from "@/components/ProcessStepsSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: `${site.pages.process.title} | ${site.brand.name}`,
  description: site.description,
};

export default function ProcessPage() {
  return (
    <>
      {/* Hero banner */}
      <PageHero
        label={site.pages.process.title}
        heading={site.pages.process.intro}
      />

      {/* Process steps */}
      <ProcessStepsSection />

      {/* Bottom CTA */}
      <FinalCTASection />
    </>
  );
}
