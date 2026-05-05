import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { iconMap } from "@/components/icons";

export function ProcessStepsSection() {
  const { sections, process } = site;

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container width="narrow">
        <SectionHeading
          label={sections.processLabel}
          heading={sections.process}
          align="left"
        />

        <ol className="mt-14 border-t border-line" role="list">
          {process.map((step, index) => {
            const Icon = iconMap[step.icon] ?? iconMap.phone;
            return (
              <li
                key={step.step}
                className="group flex flex-col gap-5 border-b border-line py-8 sm:flex-row sm:items-start sm:gap-7 sm:py-10"
              >
                <div className="flex shrink-0 items-center gap-4 sm:w-44 sm:flex-col sm:items-start sm:gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <IconBadge size="md">
                    <Icon className="h-5 w-5" />
                  </IconBadge>
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-[22px] leading-[1.2] text-ink sm:text-[26px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-muted-strong">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
