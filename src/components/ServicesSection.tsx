import { site } from "@/content/siteContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { ScalesIcon, ChatIcon } from "@/components/icons";

const categoryIcons = [ScalesIcon, ChatIcon];

export function ServicesSection() {
  const { sections, services } = site;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.servicesLabel}
          heading={sections.services}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {services.map((category, idx) => {
            const Icon = categoryIcons[idx] ?? ScalesIcon;
            return (
              <div
                key={category.category}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
              >
                {/* Top gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)]" />

                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <IconBadge size="lg">
                      <Icon className="h-7 w-7" />
                    </IconBadge>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--brand-black)]">
                        {category.category}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {category.blurb}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {category.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-blue)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
