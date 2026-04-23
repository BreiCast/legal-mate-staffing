import { site } from "@/content/siteContent";
import { ContactCard } from "@/components/ContactCard";
import { PageHero } from "@/components/ui/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata = {
  title: `${site.pages.contact.title} | ${site.brand.name}`,
  description: site.description,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero banner */}
      <PageHero
        label={site.pages.contact.title}
        heading={site.pages.contact.subtitle}
      />

      {/* Contact card */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="mx-auto max-w-3xl">
            <ImagePlaceholder
              title="Contact and support visual"
              assetPath="/images/contact/contact-support.jpg"
              ratio="wide"
              note="Use a friendly, professional support image."
            />
          </div>
          <ContactCard />
        </div>
      </section>
    </>
  );
}
