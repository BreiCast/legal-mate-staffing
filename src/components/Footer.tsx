import Link from "next/link";
import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

function SocialIcon({ platform }: { platform: string }) {
  const paths: Record<string, string> = {
    linkedin:
      "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z",
    instagram:
      "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z",
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    tiktok: "M9 12a4 4 0 104 4V4a5 5 0 005 5",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d={paths[platform] ?? paths.linkedin} />
    </svg>
  );
}

export function Footer() {
  const { brand, navLinks, footer, contact, services, hero, compliance } = site;

  const socials = Object.entries(contact.social).filter(([, url]) => url);
  const serviceNames = services.flatMap((s) => s.items).slice(0, 8);

  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-12 sm:gap-10">
          {/* Brand + tagline + CTA */}
          <div className="sm:col-span-12 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex transition hover:opacity-90"
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt=""
                width={200}
                height={56}
                className="h-9 w-auto max-h-12 object-contain"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                decoding="async"
              />
            </Link>
            <p className="mt-6 max-w-sm font-serif text-[22px] leading-[1.25] text-ink">
              {footer.tagline}.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={hero.cta.requestQuote.href}
                size="md"
                variant="primary"
                withArrow
              >
                {footer.cta}
              </ButtonLink>
              {socials.length > 0 && (
                <div className="ml-2 flex gap-2">
                  {socials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pages */}
          <div className="sm:col-span-4 lg:col-span-2 lg:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {footer.pagesLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="sm:col-span-4 lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {footer.servicesLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {serviceNames.map((name) => (
                <li key={name}>
                  <span className="text-[14px] text-ink/80">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-4 lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {footer.contactLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {!contact.email && !contact.phone && !contact.whatsapp && (
                <li>
                  <Link
                    href="/contact"
                    className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                  >
                    Get in touch
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Compliance row */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-3xl text-[12px] leading-[1.6] text-muted">
            <span className="font-mono uppercase tracking-[0.18em] text-ink/70">
              {compliance.headline}
            </span>
            <span className="mx-2 text-line-strong">·</span>
            {compliance.text}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted">
            &copy; {new Date().getFullYear()} {brand.name}. {footer.legal}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Remote · Bilingual · U.S. legal workflows
          </p>
        </div>
      </Container>
    </footer>
  );
}
