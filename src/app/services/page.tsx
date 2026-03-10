import { site } from "@/content/siteContent";
import { ServicesSection } from "@/components/ServicesSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: `${site.pages.services.title} | ${site.brand.name}`,
  description: site.description,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero banner */}
      <PageHero
        label={site.pages.services.title}
        heading={site.pages.services.subtitle}
      />

      {/* Services */}
      <ServicesSection />

      {/* Bottom CTA */}
      <FinalCTASection />
    </>
  );
}
