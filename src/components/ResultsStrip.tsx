import { site } from "@/content/siteContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { iconMap } from "@/components/icons";

export function ResultsStrip() {
  const { results } = site;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={results.label} heading={results.headline} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.items.map((item) => {
            const Icon = iconMap[item.icon] ?? iconMap.zap;
            return (
              <div
                key={item.text}
                className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue)]/30 hover:bg-white hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
              >
                <div className="mb-4">
                  <IconBadge>
                    <Icon />
                  </IconBadge>
                </div>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
