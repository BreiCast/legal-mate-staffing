import { site } from "@/content/siteContent";

export function TrustedByStrip() {
  const { trustedBy } = site;

  return (
    <section className="border-y border-[var(--border)] bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          {trustedBy.label}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustedBy.logos.map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500 transition hover:border-[var(--brand-blue)]/30 hover:text-[var(--brand-blue)]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
