import { site } from "@/content/siteContent";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { iconMap } from "@/components/icons";

export function DifferentiatorsSection() {
  const { sections, differentiators, images } = site;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.differentiators}
          heading={sections.differentiatorsSubhead}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? iconMap.briefcase;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue)]/30 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="-mx-6 -mt-6 mb-5 h-24 overflow-hidden border-b border-gray-100">
                  <div className="relative h-full w-full">
                    <Image
                      src={images.differentiator.src}
                      alt={images.differentiator.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                {/* Gradient corner accent */}
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-blue)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative mb-4">
                  <IconBadge>
                    <Icon />
                  </IconBadge>
                </div>

                <h3 className="relative font-semibold text-[var(--brand-black)] transition-colors duration-200 group-hover:text-[var(--brand-blue)]">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-gray-500">
                  {item.text}
                </p>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
