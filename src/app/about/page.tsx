import { site } from "@/content/siteContent";
import Image from "next/image";
import { FoundersSection } from "@/components/FoundersSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { iconMap, BarChartIcon, EyeIcon } from "@/components/icons";

export const metadata = {
  title: `${site.pages.about.title} | ${site.brand.name}`,
  description: site.description,
};

export default function AboutPage() {
  const { description, mission, vision, values, keyMessage } = site;
  const aboutPage = site.pages.about;

  return (
    <>
      <PageHero
        label={aboutPage.title}
        heading={aboutPage.subtitle}
      />

      {/* Story */}
      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{aboutPage.storyLabel}</Eyebrow>
              <h2 className="mt-5 font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:text-[52px]">
                {aboutPage.storyHeading}
              </h2>
              <p className="mt-7 text-[16px] leading-[1.7] text-muted-strong">
                {description}
              </p>
              <p className="mt-5 text-[16px] leading-[1.7] text-muted-strong">
                {keyMessage}
              </p>
            </div>

            <div className="space-y-5 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={site.images.aboutStory.src}
                  alt={site.images.aboutStory.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale-[0.15]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {aboutPage.stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-line bg-paper p-5"
                  >
                    <p className="font-serif text-[28px] leading-none text-ink sm:text-[34px]">
                      {stat.value}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="group rounded-xl border border-line bg-paper p-8 transition-colors duration-200 hover:border-ink hover:bg-surface sm:p-10">
              <IconBadge size="md">
                <BarChartIcon className="h-5 w-5" />
              </IconBadge>
              <h2 className="mt-6 font-serif text-[24px] leading-[1.2] text-ink sm:text-[28px]">
                {aboutPage.missionLabel}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65] text-muted-strong">
                {mission}
              </p>
            </article>
            <article className="group rounded-xl border border-line bg-paper p-8 transition-colors duration-200 hover:border-ink hover:bg-surface sm:p-10">
              <IconBadge size="md">
                <EyeIcon className="h-5 w-5" />
              </IconBadge>
              <h2 className="mt-6 font-serif text-[24px] leading-[1.2] text-ink sm:text-[28px]">
                {aboutPage.visionLabel}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65] text-muted-strong">
                {vision}
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <SectionHeading
            label={aboutPage.valuesSubhead}
            heading={aboutPage.valuesLabel}
            align="left"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = iconMap[v.icon] ?? iconMap.star;
              return (
                <article
                  key={v.title}
                  className="group rounded-xl border border-line bg-paper p-7 transition-colors duration-200 hover:border-ink hover:bg-surface"
                >
                  <IconBadge size="md">
                    <Icon className="h-5 w-5" />
                  </IconBadge>
                  <h3 className="mt-6 font-serif text-[20px] leading-[1.2] text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-muted-strong">
                    {v.text}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <FoundersSection />
    </>
  );
}
