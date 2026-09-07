"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/content/company";
import { contact } from "@/lib/config";
import { Arrow, Brand, ButtonLink, Container } from "@/components/ui/Primitives";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function outside(event: MouseEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", close);
    document.addEventListener("mousedown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("mousedown", outside);
    };
  }, [open]);
  const active = (href: string) =>
    pathname === href ||
    (href === "/legal-staffing" && /^\/(roles|practice-areas)/.test(pathname));
  return (
    <header className="site-header" ref={header}>
      <Container>
        <div className="header-main">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {company.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {contact.bookingUrl && (
              <Link
                className="header-book"
                href={contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="book_call_click"
                data-location="navigation"
              >
                Book a call
              </Link>
            )}
            <ButtonLink
              href="/request-candidates"
              event="primary_cta_click"
              location="navigation"
            >
              Find legal staff
            </ButtonLink>
          </div>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d={open ? "m6 6 12 12M6 18 18 6" : "M3 8h18M3 16h18"} />
            </svg>
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!open}
        >
          {company.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/talent" onClick={() => setOpen(false)}>
            Example candidate profiles
          </Link>
          {contact.bookingUrl && (
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              data-event="book_call_click"
              data-location="mobile_navigation"
            >
              Book a call
            </a>
          )}
          <Link
            className="button button-primary"
            href="/request-candidates"
            onClick={() => setOpen(false)}
            data-event="primary_cta_click"
            data-location="mobile_navigation"
          >
            Find legal staff <Arrow diagonal />
          </Link>
        </nav>
      </Container>
    </header>
  );
}
