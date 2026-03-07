import Image from "next/image";
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

      {/* Team image */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <Image
              src="/team.jpg"
              alt="Legal Mate Staffing team"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Bottom CTA */}
      <FinalCTASection />
    </>
  );
}
