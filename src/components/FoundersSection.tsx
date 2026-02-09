import { site } from "@/content/siteContent";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FoundersSection() {
  const { sections, founders } = site;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.foundersLabel}
          heading={sections.founders}
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
            >
              {/* Gradient top bar */}
              <div className="h-1.5 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)]" />

              <div className="p-8">
                <div className="flex items-start gap-5">
                  {/* Avatar with initials */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-blue)]/80 text-xl font-bold text-white shadow-md shadow-[var(--brand-blue)]/25 transition-transform duration-300 group-hover:scale-105">
                    {founder.initials}
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
