import { site } from "@/content/siteContent";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FoundersSection() {
  const { sections, founders, images } = site;

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <SectionHeading
          label={sections.foundersLabel}
          heading={sections.founders}
          align="left"
        />

        <div className="mt-14 grid gap-8 border-t border-line pt-14 sm:grid-cols-2 sm:gap-12">
          {founders.map((founder, idx) => (
            <article key={founder.name} className="flex items-start gap-5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-paper sm:h-16 sm:w-16">
                <Image
                  src={(images.founders[idx] ?? images.founders[0]).src}
                  alt={(images.founders[idx] ?? images.founders[0]).alt}
                  fill
                  sizes="64px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-[20px] leading-[1.2] text-ink">
                  {founder.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {founder.title}
                </p>
                <p className="mt-4 text-[14px] leading-[1.65] text-muted-strong">
                  {founder.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
