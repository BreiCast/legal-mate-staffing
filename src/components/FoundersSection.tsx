import { site } from "@/content/siteContent";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FoundersSection() {
  const { sections, founders, images } = site;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.foundersLabel}
          heading={sections.founders}
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
            >
              {/* Gradient top bar */}
              <div className="h-1.5 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)]" />

              <div className="p-8">
                <div className="flex items-start gap-5">
                  {/* Founder headshot placeholder */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl shadow-md shadow-[var(--brand-blue)]/15 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={(images.founders[idx] ?? images.founders[0]).src}
                      alt={(images.founders[idx] ?? images.founders[0]).alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--brand-black)]">
                      {founder.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-[var(--brand-blue)]">
                      {founder.title}
                    </p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-gray-600">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
