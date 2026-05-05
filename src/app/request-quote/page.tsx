import { site } from "@/content/siteContent";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { IconBadge } from "@/components/ui/IconBadge";
import { iconMap } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata = {
  title: `${site.pages.requestQuote.title} | ${site.brand.name}`,
  description: site.pages.requestQuote.subtitle,
};

export default function RequestQuotePage() {
  const pg = site.pages.requestQuote;

  return (
    <>
      <PageHero
        label={pg.title}
        heading={pg.subtitle}
        imageSrc={site.images.pageHero.src}
        imageAlt={site.images.pageHero.alt}
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Form column (2/3 width) */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[var(--brand-black)] sm:text-2xl">
                {pg.formHeading}
              </h2>
              <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)]" />
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>

            {/* Trust sidebar (1/3 width) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                <div className="relative -mx-6 -mt-6 mb-6 h-40 overflow-hidden rounded-t-2xl border-b border-gray-200 sm:-mx-8 sm:-mt-8">
                  <Image
                    src={site.images.quoteSidebar.src}
                    alt={site.images.quoteSidebar.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-blue)]">
                  {pg.trustHeading}
                </h3>
                <div className="mt-6 space-y-5">
                  {pg.trustPoints.map((point) => {
                    const Icon = iconMap[point.icon] ?? iconMap.check;
                    return (
                      <div key={point.text} className="flex items-start gap-3.5">
                        <IconBadge size="sm" hoverFlip={false}>
                          <Icon className="h-5 w-5" />
                        </IconBadge>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {point.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gray-200" />

                {/* Quick contact fallback */}
                <p className="text-xs font-medium text-gray-500">
                  Prefer to talk first?
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {site.contact.email && (
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-sm font-medium text-[var(--brand-blue)] transition hover:underline"
                    >
                      {site.contact.email}
                    </a>
                  )}
                  {site.contact.whatsapp && (
                    <a
                      href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--brand-blue)] transition hover:underline"
                    >
                      WhatsApp us
                    </a>
                  )}
                  {!site.contact.email && !site.contact.whatsapp && (
                    <a
                      href="/contact"
                      className="text-sm font-medium text-[var(--brand-blue)] transition hover:underline"
                    >
                      View contact details
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
