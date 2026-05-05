"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const { brand, navLinks, hero } = site;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={menuRef}
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
          aria-label={brand.name}
        >
          <img
            src={brand.logo}
            alt=""
            width={200}
            height={56}
            className="h-9 w-auto max-h-12 object-contain object-left shrink-0"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks
            .filter((l) => l.href !== "/")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm ${
                  isActive(link.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          <ButtonLink href={hero.cta.requestQuote.href} size="md" withArrow>
            {hero.cta.requestQuote.label}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-ink/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </Container>

      <div
        className={`overflow-hidden border-line bg-paper transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:hidden ${
          mobileMenuOpen
            ? "max-h-96 border-t opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <Container className="py-5" as="nav" aria-label="Mobile">
          <ul className="space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-[14px] font-medium transition ${
                    isActive(link.href)
                      ? "bg-ink/[0.04] text-ink"
                      : "text-muted hover:bg-ink/[0.03] hover:text-ink"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <ButtonLink
              href={hero.cta.requestQuote.href}
              size="lg"
              className="w-full"
              withArrow
            >
              {hero.cta.requestQuote.label}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
