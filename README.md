# Legal Mate Staffing

A legal-first marketing and lead-generation site for Legal Mate Staffing LLC. Built with Next.js App Router, React, TypeScript, and a shared editorial design system.

## Run locally

Use Node.js 22+ and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Pages work without service credentials. An unconfigured lead endpoint returns an honest `503`; it never simulates a successful submission. The approved public contact is **info@legalmatestaffing.com**.

```bash
npm run lint
npm test
npm run build
npm run test:e2e
npm run check:config
```

`npm test` covers validation, provider acceptance/failure, bounded requests, origin checks, honeypots, rate limits, retry identity, and private logging. Browser tests run against a production build on port 3001 at desktop, tablet, and mobile sizes. Install the browser once with `npx playwright install chromium`. `npm run check` runs lint, unit/integration tests, and build. The browser suite assumes `.env.local` has no production credentials and the canonical URL is unset; do not run it against live lead destinations. Its success-path test uses the actual lead handler with an isolated in-memory store and a controlled email-provider response; it sends no real emails.

## Architecture

- `src/app/`: server-rendered pages, statically generated role/practice/resource routes, metadata routes, redirects, and `/api/leads`.
- `src/components/ui/Primitives.tsx`: shared container, section, headings, links, breadcrumbs, and brand mark.
- `src/components/marketing/HomeSections.tsx`: reusable homepage and service-page sections.
- `src/components/Cards.tsx`: roles, practice areas, example/approved candidates, gated testimonials, and gated metrics.
- `src/components/LeadForm.tsx`: short form, optional details, accessible failures, retry identity, and confirmed-success state.
- `src/components/Analytics.tsx`: optional GA4 loading, preferences, and delegated click tracking.
- `src/content/`: structured roles, practice areas, company information, proof, and resources.
- `src/lib/leads/`: server validation flow, email integration, and shared storage adapters.
- `src/lib/config.ts`: validated public configuration. Empty contact channels and scheduling links are omitted.
- `src/app/globals.css`: navy/ivory/sage tokens, editorial typography, responsive layouts, focus states, and reduced-motion behavior.

Most marketing components are server components. Client JavaScript is limited to navigation, the form, and measurement/preferences. Fonts use `next/font`; the single homepage photograph uses `next/image` with a responsive size and preload. There is no animation library. A sticky header and inline CTAs provide access without a floating mobile widget covering the page.

Old `/services` and `/request-quote` links permanently redirect to `/legal-staffing` and `/request-candidates`. Legacy components and unsubstantiated marketing data were removed only after an import-graph check showed they were unused.

## Environment variables

Copy `.env.example`; never commit `.env.local` or credentials. Public values are embedded at build time, so changing them requires a rebuild.

| Variable                        | Purpose                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Approved canonical HTTPS origin. Required before indexing/launch. Do not infer it from an email address.                      |
| `NEXT_PUBLIC_CONTACT_EMAIL`     | Public email; defaults to the user-approved `info@legalmatestaffing.com`.                                                     |
| `NEXT_PUBLIC_CONTACT_PHONE`     | Optional public phone number with country code.                                                                               |
| `NEXT_PUBLIC_WHATSAPP`          | Optional actively monitored WhatsApp number, international digits.                                                            |
| `NEXT_PUBLIC_BOOKING_URL`       | Actual HTTPS scheduling link. Empty/invalid values hide all booking buttons.                                                  |
| `NEXT_PUBLIC_LINKEDIN_URL`      | Optional approved company LinkedIn URL.                                                                                       |
| `NEXT_PUBLIC_BUSINESS_LOCATION` | Optional approved public location. No address is invented.                                                                    |
| `RESEND_API_KEY`                | Server-only sending key.                                                                                                      |
| `LEAD_FROM_EMAIL`               | Sender on a Resend-verified domain. The example suggests the approved company email; DNS verification is still required.      |
| `LEAD_TO_EMAIL`                 | One monitored notification inbox. The example uses `info@legalmatestaffing.com`.                                              |
| `LEAD_HASH_SECRET`              | Server-only random secret for hashing request identities and rate-limit keys. Generate with `openssl rand -hex 32`.           |
| `UPSTASH_REDIS_REST_URL`        | Shared Redis HTTPS REST endpoint; required in production.                                                                     |
| `UPSTASH_REDIS_REST_TOKEN`      | Server-only Redis REST token; required in production.                                                                         |
| `LEAD_TRUSTED_IP_HEADER`        | Self-hosting only: header your trusted proxy **overwrites** with the real client IP. Never trust arbitrary forwarded headers. |
| `NEXT_PUBLIC_GA_ID`             | Optional GA4 measurement ID, e.g. `G-…`. Analytics loads only after permission.                                               |

`npm run check:config` checks presence and syntax without printing secrets. It does not prove provider access, domain ownership, inbox delivery, or a working scheduler.

## Lead destination and acceptance contract

The primary lead destination is the monitored inbox in `LEAD_TO_EMAIL`. There is no CRM or candidate database in this repository.

1. The client records first-touch session attribution (landing path, referrer origin, and UTMs). It never puts form contents in the page URL.
2. `/api/leads` checks Origin/content type, reads at most 16 KB, and validates all fields with Zod. Server validation is authoritative.
3. Filled honeypots are rejected. They do not receive a fake success response.
4. Shared atomic Redis limits apply: 8 attempts per IP per 15 minutes, 3 per email per hour, and 100 globally per hour. Limits include retries. Tune them to actual traffic and provider capacity.
5. Redis stores an HMAC of normalized request content and the initial server timestamp under a UUID for 24 hours. This provides a stable provider payload across retries. It does not store the lead's contact fields or message.
6. Resend receives one strict batch: the internal lead notification, and the prospect's receipt confirmation. Messages are plain text, and untrusted names/notes are not echoed in the prospect confirmation.
7. Only a successful provider response with **two email IDs** results in `201 { ok: true, reference }` and the UI conversion. Rejections, incomplete responses, timeouts, missing configuration, or storage failures return errors and keep entered details available.
8. The browser emits `form_submitted` only after that acceptance. The prospect can immediately book a call if scheduling is configured.

Redis uses atomic Lua operations so limits and retry metadata work across server instances. Local development can use memory storage when Redis is absent; **production fails closed without Redis**. Vercel uses its overwritten `x-vercel-forwarded-for` header. On other hosts, configure a trustworthy proxy header or the application uses a shared unknown-IP bucket. Origin checks and honeypots are defense in depth; watch rate-limit events and add host-level bot controls if traffic warrants it.

Resend deduplicates the same UUID/payload for 24 hours. An unchanged client retry reuses the UUID. Editing the form creates a new UUID; the backend rejects changed payloads under an existing reference. Retry responses can be ambiguous during a provider timeout, so the message says receipt could not be confirmed rather than claiming the lead was lost.

**Acceptance is not guaranteed inbox delivery.** Monitor delivery/bounce/suppression events in Resend and keep the destination inbox monitored. Application logs contain only event names, references, timestamps, and provider IDs (`lead_accepted`, `lead_failed`, `lead_rate_limited`, `lead_configuration_missing`). Do not add PII to logs. Set appropriate mailbox/provider retention and access policies. There is no background retry queue in this version: failed requests remain with the visitor, while accepted requests are queued by the email provider.

## Booking and contact

Set `NEXT_PUBLIC_BOOKING_URL` to the approved Calendly or other provider link. Shared booking links appear in the hero, navigation, candidate section, final CTA, contact, role/practice detail, and successful form state. They open the actual provider in a new tab. No date, availability, or appointment is fabricated. “Book a 20-minute call” is intentionally avoided until the actual duration is confirmed.

The public email works without email API configuration. Blank phone, WhatsApp, LinkedIn, location, and booking settings render nothing. Test configured contact destinations on a device before release.

## Measurement and privacy

Custom events:

- `primary_cta_click` (location)
- `book_call_click` (location)
- `form_started` (form)
- `form_submitted` (form, only after acceptance)
- `candidate_profile_interaction` (profile identifier, location)
- `phone_click`, `email_click`, `whatsapp_click` (location)

Events are available to first-party integrations through the browser's `legal-mate:analytics` custom event. Without an analytics provider they are not persisted remotely. Do not mistake browser events for a reporting database.

When GA4 is configured, optional analytics is consent-gated. Declining analytics or setting Do Not Track does not prevent form submission. Custom events exclude contact information and free-text notes. Pageview payloads strip query strings. **Disable GA4 Enhanced Measurement form interactions and browser-history pageviews** for this stream; this application handles pageviews and form events itself. Also disable automatic outbound/link events if you only want the sanitized custom events. Review your GA4 stream settings before enabling it.

Mark `form_submitted` as a key event in GA4. Use standard `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` parameters in campaign links. The full attribution follows the lead into the notification email, so it works even if optional analytics is declined.

The privacy page describes the implemented behavior. The company must confirm operational retention practices and any jurisdiction-specific additions before launch.

## SEO and content management

Every content page has its own title, description, canonical, OpenGraph, and Twitter metadata. Organization/EmploymentAgency, Service, and BreadcrumbList JSON-LD are used where relevant. No fabricated ratings, reviews, jobs, or customer claims are marked up. The sitemap includes the canonical content routes; redirect aliases and API endpoints are excluded.

The site is intentionally **noindex** when its canonical domain is unset, and on Vercel previews. Configure the approved domain and rebuild to make production indexable. The OG card and app icons are generated/served locally.

### Add a role

Add a complete record to `src/content/roles.ts`: slug, names, summary, introduction, tasks, evaluation criteria, onboarding guidance, and applicable practice-area slugs. The static route, listing, metadata, sitemap, and form choices follow the data. Content should explain the actual work and supervision boundaries, with no invented software proficiency or timelines.

### Add a practice area

Add a record to `src/content/practice-areas.ts` with distinct workflows and considerations; reference existing role slugs. The route, listing, metadata, sitemap, and form choice are generated automatically. Confirm that Legal Mate supports the practice before publishing.

### Add a resource

Add a focused guide to `src/content/resources.ts`. It should help a buyer make a real hiring or onboarding decision. Avoid mass-generated variations, unsupported pricing, or legal advice. The directory, route, metadata, and sitemap use the same source.

### Add testimonials and metrics

`testimonials` and `trustMetrics` in `src/content/company.ts` start empty. Provide actual approved proof and an internal permission/source reference, then explicitly set `approved: true`. Components hide entries lacking approval or source references. Never add placeholder claims. Do not put confidential approval documents in the content file.

### Add real candidates safely

Examples use `kind: "example"` and are visibly labeled on every card. To publish an actual candidate, obtain explicit permission, verify every displayed fact, minimize identifying details, and provide an internal approval reference. Set `kind: "approved"`, `approvedForPublication: true`, and `approvalReference`. Without both approval fields, the card is hidden. Do not publish private contact details, dates of birth, addresses, client matter information, or résumés without a separate reviewed workflow. Review availability regularly and remove stale profiles.

The current presentation intentionally uses roles and initials rather than simulated people or invented years of experience. Adjust supporting talent-page copy if switching from all examples to approved inventory.

### Add photos or software evidence

Founder portrait paths remain null until identity and publication permission are confirmed. One existing portrait file is retained for review; it is not rendered. See `docs/content-audit.md` and `docs/image-credits.md`.

`verifiedSoftware` starts empty. Add a tool name only after documenting actual familiarity and an evidence reference. The current section describes reviewing a firm's stack without implying proficiency in particular products. No vendor logos or certification marks are used.

## Deploy

This is a standard Next.js Node deployment, not a static export. It can run on Vercel or another Node host.

1. Configure production and preview separately. Do not connect review deployments to a live inbox without intending to receive their submissions.
2. Verify the Resend sender domain and set the lead sender/destination/key.
3. Provision persistent Upstash Redis; set credentials and the hash secret. Confirm trusted client-IP behavior on your host.
4. Supply the approved canonical domain and scheduling URL, plus any other public contact details.
5. Run `npm run check:config`, `npm run check`, and the browser tests in an isolated test environment.
6. Deploy using the repository's hosting workflow. For a Node host: `npm run build` then `npm run start`.
7. Send a controlled live inquiry to an inbox you own. Verify the internal message, prospect confirmation, provider IDs, UTMs, and booking destination. Check spam placement and provider delivery logs.
8. Verify live metadata, robots/sitemap, mobile navigation, and form error handling. Then enable campaigns/indexing.

No production deployment or real email send is performed by the test suite. See `docs/launch-checklist.md` for the remaining business configuration and `docs/verification.md` for the recorded checks.

## Integration references

- [Resend strict batch API](https://resend.com/docs/api-reference/emails/send-batch-emails)
- [Resend idempotency behavior](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi)
- [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
