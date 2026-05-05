import { site } from "@/content/siteContent";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PhoneIcon, GlobeIcon, ClockIcon } from "@/components/icons";

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
    <div className="group flex items-start gap-4 rounded-xl border border-line bg-paper p-6 transition-colors duration-200 hover:border-ink hover:bg-surface">
      <IconBadge size="md">{icon}</IconBadge>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
        {hasValue && href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-2 block truncate font-serif text-[18px] text-ink transition-colors hover:text-ink/80"
          >
            {display}
          </a>
        ) : (
          <p className="mt-2 truncate font-serif text-[18px] italic text-muted">
            {display}
          </p>
        )}
      </div>
    </div>
  );
}

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
      className="inline-flex items-center gap-2.5 rounded-md border border-line bg-paper px-4 py-2.5 text-[13px] font-medium text-ink/80 transition-colors hover:border-ink hover:text-ink"
    >
      <GlobeIcon className="h-4 w-4" />
      {labels[platform] ?? platform}
    </a>
  );
}

export function ContactCard() {
  const { contact, pages, hero } = site;
  const pg = pages.contact;
  const labels = contact.labels;
  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  const socials = Object.entries(contact.social).filter(([, url]) => url);

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {pg.reachLabel}
        </p>
        <h2 className="mt-5 font-serif text-[28px] leading-[1.15] text-ink sm:text-[36px]">
          {pg.cardTitle}
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-muted-strong">
          {pg.reachSubhead}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <ContactTile
          icon={<MailIcon className="h-5 w-5" />}
          label={labels.email}
          value={contact.email}
          href={contact.email ? `mailto:${contact.email}` : undefined}
        />
        <ContactTile
          icon={<PhoneIcon className="h-5 w-5" />}
          label={labels.phone}
          value={contact.phone}
          href={contact.phone ? `tel:${contact.phone}` : undefined}
        />
        <ContactTile
          icon={<WhatsAppIcon className="h-5 w-5" />}
          label={labels.whatsapp}
          value={contact.whatsapp}
          href={whatsappHref}
          external
        />
        <ContactTile
          icon={<CalendarIcon className="h-5 w-5" />}
          label={labels.bookCall}
          value={contact.bookingUrl ? labels.bookNow : ""}
          href={contact.bookingUrl || undefined}
          external
        />
        {contact.cityCountry && (
          <ContactTile
            icon={<MapPinIcon className="h-5 w-5" />}
            label="Location"
            value={contact.cityCountry}
          />
        )}
        {contact.hours && (
          <ContactTile
            icon={<ClockIcon className="h-5 w-5" />}
            label="Hours"
            value={contact.hours}
          />
        )}
      </div>

      {socials.length > 0 && (
        <div className="mt-14 border-t border-line pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {pg.connectLabel}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {socials.map(([platform, url]) => (
              <SocialLink key={platform} platform={platform} url={url} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 rounded-xl border border-line bg-paper p-8 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-[22px] leading-[1.2] text-ink sm:text-[26px]">
              {pg.quoteCardHeading}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-[1.6] text-muted-strong">
              {pg.quoteCardText}
            </p>
          </div>
          <ButtonLink
            href={hero.cta.requestQuote.href}
            size="lg"
            variant="primary"
            withArrow
            className="shrink-0"
          >
            {pg.quoteCardCta}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
