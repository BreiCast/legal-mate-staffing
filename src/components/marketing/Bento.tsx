import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { iconMap } from "@/components/icons";

export function Bento() {
  const { bento } = site;
  const [large, ...small] = bento.tiles;
  const LargeIcon = iconMap[large.icon] ?? iconMap.briefcase;

  return (
    <section className="bg-paper py-24 sm:py-32" aria-labelledby="bento-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{bento.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            size="lg"
            id="bento-heading"
            className="mt-5 mx-auto"
          >
            {bento.heading}
          </Heading>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Large tile */}
          <article className="group relative flex flex-col justify-between rounded-xl border border-line bg-paper p-8 transition-colors duration-200 hover:border-ink hover:bg-surface sm:p-10 lg:col-span-1 lg:row-span-2">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink/70 transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                <LargeIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-7 font-serif text-[28px] leading-[1.15] text-ink sm:text-[32px]">
                {large.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-muted-strong">
                {large.text}
              </p>
            </div>
            {large.stat && (
              <div className="mt-10 border-t border-line pt-6">
                <p className="font-serif text-[40px] leading-none text-ink sm:text-[52px]">
                  {large.stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {large.stat.label}
                </p>
              </div>
            )}
          </article>

          {small.map((tile, i) => {
            const Icon = iconMap[tile.icon] ?? iconMap.briefcase;
            const wide = i === 0;
            return (
              <article
                key={tile.title}
                className={`group relative rounded-xl border border-line bg-paper p-7 transition-colors duration-200 hover:border-ink hover:bg-surface sm:p-8 ${
                  wide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink/70 transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-[22px] leading-[1.2] text-ink">
                  {tile.title}
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-[1.6] text-muted-strong">
                  {tile.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
