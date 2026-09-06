# Verification record — September 6, 2026

Verified the redesigned site locally against a production Next.js 16.3.4 build. Production credentials and an approved canonical domain were not supplied, so external delivery and actual scheduling remain launch configuration steps.

## Completed checks

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, no errors or warnings |
| `npm test` | 19 passing lead-handling tests |
| `npm run build` | Pass, TypeScript checked; 37 generated outputs including metadata/redirects |
| `npm run test:e2e` | 15 passing scenarios across desktop, tablet, and mobile |
| Final accessibility rerun after visible/accessible brand-label fix | 3 passing viewport scenarios, five representative pages each |
| `npm audit` | 0 vulnerabilities |
| `git diff --check` | Pass |
| Import-graph cleanup | No unreachable components remain |
| Browser console | No page errors on the 26 content routes |
| Internal links | Every collected internal destination returned 200 |
| Legacy routes | `/services` and `/request-quote` return 308 redirects |
| Invalid role/practice slug | 404 |
| Icons and OpenGraph image | 200, visually inspected |
| Titles, descriptions, canonical/OG/Twitter metadata, sitemap | Verified across all 26 content pages |
| Empty action/contact links | None; working skip/error anchors are retained |
| Horizontal overflow | None on all content routes at all three test sizes |
| Unsupported proof | No testimonials, customer logos, performance metrics, candidate availability, or software proficiency claims are rendered without evidence |

## Lead flow

- Browser → real unconfigured route → `503` → visible error, retained form values, and working email fallback: **verified**.
- Browser → actual lead handler with isolated storage → controlled provider acceptance of both messages → success state and one conversion event: **verified**.
- Role and practice prefill: **verified**.
- First landing page and campaign attribution persist through navigation and reach the notification payload: **verified**.
- Provider rejection, incomplete IDs, malformed payload, timeout, retry stability, changed-request conflict, Redis outage, honeypot, origin/content type/body-size validation, and rate limits: **verified**.
- Real Resend account acceptance, inbox delivery, shared production Redis connectivity, DNS, and live scheduler: **not performed; require external configuration**.
- Test fixture emails are not transmitted to real recipients.

## Accessibility and visual review

Desktop: 1440 × 1000. Tablet: 768 × 1024. Mobile: iPhone 13 emulation (390 × 844 CSS pixels). Browser automation uses Chromium. Full-page homepage and form screenshots are retained in `.verification/screenshots` (ignored by git).

Manually inspected the desktop/tablet/mobile hero, full homepage composition, short form, and OpenGraph card. Checked the mobile menu, Escape/focus restoration, skip link, native disclosures, readable error feedback, and layout bounds. The mobile form now precedes its supporting checklist. No floating CTA covers content.

Axe checks include WCAG 2 A/AA and WCAG 2.1 A/AA tags. Representative pages: home, candidate request, role detail, practice-area detail, and contact. Automated tools supplement the visual/keyboard checks; this is not a claim of universal accessibility certification.

## Lighthouse 13.4.1

Local production build, default Lighthouse mobile throttling and desktop preset. These are lab results, not field Core Web Vitals. No optional GA4 script was configured. The initial mobile run measured 93 performance; after the final label correction, an isolated run measured 98.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 98 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 69 | 69 |
| Largest Contentful Paint | 2.4 s | 0.6 s |
| Total Blocking Time | 10 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |

**The SEO score is reduced by deliberate indexing protection:** both `noindex, nofollow` metadata and `robots.txt` block crawling until `NEXT_PUBLIC_SITE_URL` contains the approved canonical domain. Vercel preview deployments remain noindex. Configure the real domain, rebuild, and rerun the live SEO check; do not remove that safeguard simply to improve a preview score.

Raw local reports: `.verification/lighthouse-mobile-final.json` and `.verification/lighthouse-desktop.json`. Reports are deliberately not committed because they include machine-specific URLs and large embedded traces.

## Launch readiness

`npm run check:config` correctly reports the missing domain, Resend credentials/sender/destination configuration, Redis credentials, and HMAC secret. The approved public email is already present in code and `.env.example`. Booking remains hidden until configured. See `docs/launch-checklist.md`; no production deployment has been performed.
