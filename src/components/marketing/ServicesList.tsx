import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { ScalesIcon, ChatIcon } from "@/components/icons";

const categoryIcons = [ScalesIcon, ChatIcon];

export function ServicesList() {
  const { services, editorial, hero } = site;

  return (
    <section className="bg-paper py-24 sm:py-32" aria-labelledby="services-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left — sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{editorial.services.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id="services-heading"
                className="mt-5"
              >
                {editorial.services.heading}
              </Heading>
              <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-muted-strong">
                {editorial.services.body}
              </p>
              <ButtonLink
                href={hero.cta.requestQuote.href}
                size="md"
                variant="secondary"
                withArrow
                className="mt-8"
              >
                Discuss a role
              </ButtonLink>
            </div>
          </div>

          {/* Right — service rows */}
          <div className="lg:col-span-7">
            <ul className="border-t border-line" role="list">
              {services.map((category, idx) => {
                const Icon = categoryIcons[idx] ?? ScalesIcon;
                return (
                  <li
                    key={category.category}
                    className="group border-b border-line"
                  >
                    <div className="flex items-start gap-5 py-8 transition-colors duration-200 hover:bg-ink/[0.015] focus-within:bg-ink/[0.015] sm:gap-7 sm:py-10">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-ink/70 transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                            0{idx + 1}
                          </span>
                          <h3 className="font-serif text-[24px] leading-[1.2] text-ink sm:text-[28px]">
                            {category.category}
                          </h3>
                        </div>
                        <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-muted-strong">
                          {category.blurb}
                        </p>

                        <div className="mt-5 grid max-h-0 grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:max-h-96 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:max-h-96 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
                          <ul
                            className="flex min-h-0 flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-strong"
                            role="list"
                          >
                            {category.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2"
                              >
                                <span
                                  aria-hidden
                                  className="h-1 w-1 rounded-full bg-ink/40"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <span
                        aria-hidden
                        className="mt-1 hidden text-muted transition-colors duration-200 group-hover:text-ink sm:block"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45"
                        >
                          <path
                            d="M5 11L11 5M11 5H6M11 5v5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
