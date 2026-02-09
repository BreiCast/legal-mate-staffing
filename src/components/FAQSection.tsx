"use client";

import { useState } from "react";
import { site } from "@/content/siteContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/icons";

export function FAQSection() {
  const { faq } = site;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label={faq.label} heading={faq.headline} />

        <dl className="mt-12 space-y-3" role="list">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[var(--brand-blue)]/30 bg-white shadow-sm"
                    : "border-gray-200 bg-white"
                }`}
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-inset"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-[var(--brand-black)] sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </dt>
                <dd
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
                      {item.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
