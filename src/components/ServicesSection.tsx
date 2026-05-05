import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { ScalesIcon, ChatIcon } from "@/components/icons";

const categoryIcons = [ScalesIcon, ChatIcon];

export function ServicesSection() {
  const { sections, services } = site;

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <SectionHeading
          label={sections.servicesLabel}
          heading={sections.services}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {services.map((category, idx) => {
            const Icon = categoryIcons[idx] ?? ScalesIcon;
            return (
              <article
                key={category.category}
                className="group relative rounded-xl border border-line bg-paper p-8 transition-colors duration-200 hover:border-ink hover:bg-surface sm:p-10"
              >
                <div className="flex items-start gap-5">
                  <IconBadge size="md">
                    <Icon className="h-5 w-5" />
                  </IconBadge>
                  <div className="flex-1">
                    <h3 className="font-serif text-[24px] leading-[1.2] text-ink sm:text-[28px]">
                      {category.category}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted-strong">
                      {category.blurb}
                    </p>
                  </div>
                </div>
                <ul
                  className="mt-7 grid grid-cols-1 gap-x-5 gap-y-2 border-t border-line pt-6 text-[14px] text-ink/85 sm:grid-cols-2"
                  role="list"
                >
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-1 w-1 shrink-0 rounded-full bg-ink/40"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
