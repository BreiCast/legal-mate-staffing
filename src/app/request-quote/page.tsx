import { site } from "@/content/siteContent";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/layout/Container";
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
      />

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Form column */}
            <div className="lg:col-span-8">
              <h2 className="font-serif text-[26px] leading-[1.2] text-ink sm:text-[32px]">
                {pg.formHeading}
              </h2>
              <div className="mt-10">
                <QuoteForm />
              </div>
            </div>

            {/* Trust sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-xl border border-line bg-paper p-7 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {pg.trustHeading}
                </p>

                <ul className="mt-6 space-y-5" role="list">
                  {pg.trustPoints.map((point) => {
                    const Icon = iconMap[point.icon] ?? iconMap.check;
                    return (
                      <li key={point.text} className="flex items-start gap-3.5">
                        <IconBadge size="sm" hoverFlip={false}>
                          <Icon className="h-4 w-4" />
                        </IconBadge>
                        <p className="text-[14px] leading-[1.6] text-muted-strong">
                          {point.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div className="my-7 h-px bg-line" />

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Prefer to talk first?
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[14px]">
                  {site.contact.email && (
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-ink underline-offset-4 transition-colors hover:text-ink/70 hover:underline"
                    >
                      {site.contact.email}
                    </a>
                  )}
                  {site.contact.whatsapp && (
                    <a
                      href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline-offset-4 transition-colors hover:text-ink/70 hover:underline"
                    >
                      WhatsApp us
                    </a>
                  )}
                  {!site.contact.email && !site.contact.whatsapp && (
                    <a
                      href="/contact"
                      className="text-ink underline-offset-4 transition-colors hover:text-ink/70 hover:underline"
                    >
                      View contact details
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
