"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export function ProcessRail() {
  const { process, editorial } = site;
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const ratio = Math.max(0, Math.min(1, traveled / total));
      setProgress(ratio);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-paper py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{editorial.process.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            size="lg"
            id="process-heading"
            className="mt-5"
          >
            {editorial.process.heading}
          </Heading>
          <p className="mt-6 text-[16px] leading-[1.6] text-muted-strong">
            {editorial.process.body}
          </p>
        </div>

        {/* Desktop rail */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-7 h-px bg-line" aria-hidden />
          <div
            className="absolute left-0 top-7 h-px bg-ink transition-[width] duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
            aria-hidden
          />

          <ol className="grid grid-cols-5 gap-8" role="list">
            {process.map((step, i) => {
              const filled = progress * process.length > i;
              return (
                <li key={step.step} className="relative pt-14">
                  <span
                    className={`absolute left-0 top-[22px] -mt-px h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      filled ? "bg-ink" : "bg-line-strong"
                    }`}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-[22px] leading-[1.2] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted-strong">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile / tablet — horizontal snap carousel */}
        <div className="mt-12 lg:hidden">
          <div className="-mx-5 flex snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-8 sm:px-8 sm:scroll-px-8">
            <ol className="flex gap-5" role="list">
              {process.map((step, i) => (
                <li
                  key={step.step}
                  className="w-[78vw] max-w-[320px] shrink-0 snap-start rounded-xl border border-line bg-surface p-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-[22px] leading-[1.2] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted-strong">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
