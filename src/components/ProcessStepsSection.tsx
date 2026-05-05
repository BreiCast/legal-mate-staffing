import { site } from "@/content/siteContent";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { iconMap, ArrowDownIcon } from "@/components/icons";

export function ProcessStepsSection() {
  const { sections, process, images } = site;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label={sections.processLabel}
          heading={sections.process}
        />

        <div className="relative mt-16">
          {/* Timeline spine */}
          <div className="absolute left-6 top-0 hidden h-full w-px sm:block">
            <div className="h-full w-full bg-gradient-to-b from-[var(--brand-blue)] via-[var(--brand-blue)]/40 to-[var(--brand-red)]/30" />
          </div>

          <div className="space-y-8 sm:space-y-0">
            {process.map((step, index) => {
              const Icon = iconMap[step.icon] ?? iconMap.phone;
              return (
                <div key={step.step} className="relative sm:flex sm:items-start sm:gap-0">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-0 z-10 hidden sm:block" style={{ width: "3rem" }}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[var(--brand-blue)]/20 bg-white shadow-sm">
                      <span className="text-sm font-bold text-[var(--brand-blue)]">{index + 1}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`group sm:ml-20 sm:w-full ${index > 0 ? "sm:-mt-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue)]/30 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5 sm:p-8">
                      <div className="relative -mx-6 -mt-6 mb-5 h-32 overflow-hidden border-b border-gray-100 sm:-mx-8 sm:-mt-8 sm:h-40">
                        <Image
                          src={(images.process[index] ?? images.process[0]).src}
                          alt={(images.process[index] ?? images.process[0]).alt}
                          fill
                          sizes="(min-width: 640px) 70vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      {/* Gradient corner */}
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--brand-blue)]/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative flex items-start gap-5">
                        <IconBadge size="lg">
                          <Icon />
                        </IconBadge>

                        <div className="flex-1">
                          {/* Mobile step number */}
                          <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-[var(--brand-blue)]/60 sm:hidden">
                            {step.step}
                          </span>
                          <h3 className="text-lg font-bold text-[var(--brand-black)] transition-colors duration-200 group-hover:text-[var(--brand-blue)]">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            {step.text}
                          </p>
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Connector arrow between cards */}
                    {index < process.length - 1 && (
                      <div className="hidden justify-center py-3 sm:flex">
                        <ArrowDownIcon className="h-6 w-6 text-[var(--brand-blue)]/30" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
