import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function Check() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="38"
      height="40"
      viewBox="0 0 38 40"
      fill="none"
    >
      <path
        d="M3 2v35h15V2M20 37V2h15v35M3 20h32"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 2 18 20 35 2M3 37l15-17 17 17"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Legal Mate Staffing home">
      <Mark />
      <span className="brand-name">
        Legal Mate <span>STAFFING</span>
      </span>
    </Link>
  );
}
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
export function ButtonLink({
  children,
  href,
  variant = "primary",
  event,
  location,
  className = "",
  arrow = true,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "light" | "text";
  event?: string;
  location?: string;
  className?: string;
  arrow?: boolean;
}) {
  const external = href.startsWith("https://");
  return (
    <Link
      href={href}
      className={`button button-${variant} ${className}`}
      data-event={event}
      data-location={location}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="page-intro">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </Container>
    </section>
  );
}
