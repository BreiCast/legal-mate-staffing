import { site } from "@/content/siteContent";
import { FoundersSection } from "@/components/FoundersSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
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
      {/* Hero banner */}
      <PageHero label={aboutPage.title} heading={aboutPage.subtitle} />

      {/* Story section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                label={aboutPage.storyLabel}
                heading={aboutPage.storyHeading}
                align="left"
              />
              <p className="mt-6 leading-relaxed text-gray-600">
                {description}
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                {keyMessage}
              </p>
            </div>

            {/* Story visual and stat cards */}
            <div>
              <ImagePlaceholder
                title="Brand story visual"
                assetPath="/images/about/brand-story.jpg"
                ratio="video"
                note="Use a brand image that reflects team culture and legal operations expertise."
              />
              <div className="mt-6 grid grid-cols-2 gap-4">
                {aboutPage.stats.map((stat, idx) => {
                  const colors = [
                    "from-[var(--brand-blue)]/5",
                    "from-[var(--brand-red)]/5",
                    "from-gray-100",
                    "from-[var(--brand-blue)]/5 to-[var(--brand-red)]/5",
                  ];
                  const textColors = [
                    "text-[var(--brand-blue)]",
                    "text-[var(--brand-red)]",
                    "text-[var(--brand-black)]",
                    "text-[var(--brand-blue)]",
                  ];
                  return (
                    <div
                      key={stat.value}
                      className={`rounded-2xl border border-gray-200 bg-gradient-to-br ${colors[idx] ?? "from-gray-100"} to-transparent p-6 text-center`}
                    >
                      <p className={`text-3xl font-bold ${textColors[idx] ?? "text-[var(--brand-black)]"}`}>
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--brand-blue)]/5 transition-transform duration-500 group-hover:scale-150" />
            <div className="relative">
              <IconBadge size="sm">
                <BarChartIcon className="h-5 w-5" />
              </IconBadge>
              <h2 className="mt-4 text-xl font-bold text-[var(--brand-black)]">{aboutPage.missionLabel}</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{mission}</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--brand-red)]/5 transition-transform duration-500 group-hover:scale-150" />
            <div className="relative">
              <IconBadge size="sm">
                <EyeIcon className="h-5 w-5" />
              </IconBadge>
              <h2 className="mt-4 text-xl font-bold text-[var(--brand-black)]">{aboutPage.visionLabel}</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label={aboutPage.valuesSubhead}
            heading={aboutPage.valuesLabel}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = iconMap[v.icon] ?? iconMap.star;
              return (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue)]/30 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5"
                >
                  {/* Gradient orb */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-[var(--brand-blue)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-4">
                    <IconBadge>
                      <Icon />
                    </IconBadge>
                  </div>
                  <h3 className="relative font-semibold text-[var(--brand-black)] transition-colors duration-200 group-hover:text-[var(--brand-blue)]">
                    {v.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-gray-500">
                    {v.text}
                  </p>
                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 pb-0 pt-2 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl">
            <ImagePlaceholder
              title="Founder team visual"
              assetPath="/images/about/founder-team.jpg"
              ratio="wide"
              note="Use a professional founder or team photo that matches the brand tone."
            />
          </div>
        </div>
      </section>

      {/* Founders */}
      <FoundersSection />
    </>
  );
}
