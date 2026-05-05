"use client";

import { useState } from "react";
import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export function FaqList() {
  const { faq, editorial } = site;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section className="bg-paper py-24 sm:py-28" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{editorial.faq.eyebrow}</Eyebrow>
            <Heading as="h2" size="md" id="faq-heading" className="mt-5">
              {editorial.faq.heading}
            </Heading>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-line" role="list">
              {faq.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-line" data-state={isOpen ? "open" : "closed"}>
                    <dt>
                      <button
                        type="button"
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-ink focus:outline-none focus-visible:bg-ink/[0.02]"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-[18px] leading-[1.3] text-ink sm:text-[20px]">
                          {item.q}
                        </span>
                        <span
                          aria-hidden
                          className="relative mt-1.5 inline-block h-6 w-6 shrink-0 text-ink"
                        >
                          <span className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                          <span
                            className={`absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                              isOpen ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </button>
                    </dt>
                    <dd
                      className={`grid transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-7 pr-10 text-[15px] leading-[1.65] text-muted-strong">
                          {item.a}
                        </p>
                      </div>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
