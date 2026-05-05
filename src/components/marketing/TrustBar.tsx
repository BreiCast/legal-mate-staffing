import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";

export function TrustBar() {
  const { trustedBy, editorial } = site;

  return (
    <section className="border-y border-line bg-paper py-7" aria-labelledby="trustbar-label">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <p
            id="trustbar-label"
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
          >
            {editorial.trustBar.label}
          </p>
          <ul
            className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-muted-strong sm:gap-x-8"
            role="list"
            aria-label={trustedBy.label}
          >
            {trustedBy.logos.map((name, i) => (
              <li key={name} className="flex items-center gap-7">
                <span className="whitespace-nowrap font-medium">{name}</span>
                {i < trustedBy.logos.length - 1 && (
                  <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:inline-block" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
