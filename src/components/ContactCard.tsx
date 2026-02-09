import Link from "next/link";
import { site } from "@/content/siteContent";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  PhoneIcon,
  GlobeIcon,
  ClockIcon,
} from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                              */
/* ------------------------------------------------------------------ */

function MailIcon(props: { className?: string }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function WhatsAppIcon(props: { className?: string }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6.8 3.11 2.19 4.024A9.823 9.823 0 006.36 19.9l-2.61.78.78-2.61a9.823 9.823 0 003.116 2.19 6.735 6.735 0 004.024 2.19A9.75 9.75 0 1012 2.25a9.75 9.75 0 00-9.75 9.75z" />
    </svg>
  );
}

function CalendarIcon(props: { className?: string }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function MapPinIcon(props: { className?: string }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact method tile                                                */
/* ------------------------------------------------------------------ */

function ContactTile({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const display = value || "Coming soon";
  const hasValue = !!value;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue)]/30 hover:shadow-lg hover:shadow-[var(--brand-blue)]/5">
      {/* Corner orb */}
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-[var(--brand-blue)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <IconBadge size="md">
          {icon}
        </IconBadge>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {label}
          </p>
          {hasValue && href ? (
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="mt-1 block truncate text-base font-medium text-[var(--brand-black)] transition group-hover:text-[var(--brand-blue)]"
            >
              {display}
            </a>
          ) : (
            <p className="mt-1 text-base font-medium text-gray-400 italic">
              {display}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Social icon link                                                   */
/* ------------------------------------------------------------------ */

function SocialLink({ platform, url }: { platform: string; url: string }) {
  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 transition hover:-translate-y-0.5 hover:border-[var(--brand-blue)]/30 hover:text-[var(--brand-blue)] hover:shadow-sm"
    >
      <GlobeIcon className="h-4 w-4" />
      {labels[platform] ?? platform}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported full contact section                                      */
/* ------------------------------------------------------------------ */

export function ContactCard() {
  const { contact, pages, hero } = site;
  const pg = pages.contact;
  const labels = contact.labels;
  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  const socials = Object.entries(contact.social).filter(([, url]) => url);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Section heading — no gradient bar, hero already has one */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-blue)]">
          {pg.reachLabel}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--brand-black)] sm:text-3xl">
          {pg.cardTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-gray-500">
          {pg.reachSubhead}
        </p>
      </div>

      {/* Contact method tiles — 2-column grid for even layout */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <ContactTile
          icon={<MailIcon className="h-6 w-6" />}
          label={labels.email}
          value={contact.email}
          href={contact.email ? `mailto:${contact.email}` : undefined}
        />
        <ContactTile
          icon={<PhoneIcon />}
          label={labels.phone}
          value={contact.phone}
          href={contact.phone ? `tel:${contact.phone}` : undefined}
        />
        <ContactTile
          icon={<WhatsAppIcon className="h-6 w-6" />}
          label={labels.whatsapp}
          value={contact.whatsapp}
          href={whatsappHref}
          external
        />
        <ContactTile
          icon={<CalendarIcon className="h-6 w-6" />}
          label={labels.bookCall}
          value={contact.bookingUrl ? labels.bookNow : ""}
          href={contact.bookingUrl || undefined}
          external
        />
        {contact.cityCountry && (
          <ContactTile
            icon={<MapPinIcon className="h-6 w-6" />}
            label="Location"
            value={contact.cityCountry}
          />
        )}
        {contact.hours && (
          <ContactTile
            icon={<ClockIcon />}
            label="Hours"
            value={contact.hours}
          />
        )}
      </div>

      {/* Social links */}
      {socials.length > 0 && (
        <div className="mt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            {pg.connectLabel}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {socials.map(([platform, url]) => (
              <SocialLink key={platform} platform={platform} url={url} />
            ))}
          </div>
        </div>
      )}

      {/* Quote CTA card */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 text-center sm:p-10">
        <h3 className="text-xl font-bold text-[var(--brand-black)] sm:text-2xl">
          {pg.quoteCardHeading}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          {pg.quoteCardText}
        </p>
        <Link
          href={hero.cta.requestQuote.href}
          className="mt-6 inline-flex rounded-xl bg-[var(--brand-blue)] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
        >
          {pg.quoteCardCta}
        </Link>
      </div>
    </div>
  );
}
