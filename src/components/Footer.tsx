import Link from "next/link";
import { site } from "@/content/siteContent";

function SocialIcon({ platform }: { platform: string }) {
  const paths: Record<string, string> = {
    linkedin:
      "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z",
    instagram:
      "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z",
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    tiktok:
      "M9 12a4 4 0 104 4V4a5 5 0 005 5",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={paths[platform] ?? paths.linkedin} />
    </svg>
  );
}

export function Footer() {
  const { brand, navLinks, footer, contact, services, hero } = site;

  const socials = Object.entries(contact.social).filter(([, url]) => url);
  const serviceNames = services.flatMap((s) => s.items).slice(0, 6);

  return (
    <footer className="relative overflow-hidden bg-[var(--brand-black)]">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--brand-blue)] blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[var(--brand-red)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top section with CTA bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 py-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-white">
              Ready to build your remote team?
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Let&apos;s find the right talent for your firm.
            </p>
          </div>
          <Link
            href={hero.cta.requestQuote.href}
            className="shrink-0 rounded-xl bg-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]"
          >
            {footer.cta}
          </Link>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-blue)] text-sm font-black text-white"
              >
                LM
              </span>
              <span className="text-lg font-bold text-white">{brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              {footer.description}
            </p>
            {/* Social links */}
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-[var(--brand-blue)]/20 hover:text-[var(--brand-blue)]"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Pages column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {footer.pagesLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {footer.servicesLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {serviceNames.map((name) => (
                <li key={name}>
                  <span className="text-sm text-gray-400">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {footer.contactLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm text-gray-400 transition hover:text-white"
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
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {!contact.email && !contact.phone && !contact.whatsapp && (
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    Get in touch
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {brand.name}. {footer.legal}
          </p>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] sm:hidden" />
          <p className="text-xs text-gray-600">
            {brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
