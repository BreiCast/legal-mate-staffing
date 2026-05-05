import Image from "next/image";
import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FoundersBlock() {
  const { founders, foundersQuote, editorial, images } = site;

  return (
    <section
      className="bg-paper py-24 sm:py-32"
      aria-labelledby="founders-heading"
    >
      <Container>
        <Eyebrow>{editorial.founders.eyebrow}</Eyebrow>

        <h2
          id="founders-heading"
          className="mt-8 max-w-4xl font-serif text-[28px] leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[44px]"
        >
          <span
            aria-hidden
            className="quote-mark-in mr-2 inline-block font-serif text-[60px] leading-none text-ink/30 sm:text-[80px]"
            style={{ verticalAlign: "-0.18em" }}
          >
            “
          </span>
          {foundersQuote.text}
        </h2>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          — {foundersQuote.attribution}
        </p>

        <div className="mt-16 grid gap-10 border-t border-line pt-14 sm:grid-cols-2 sm:gap-14">
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
