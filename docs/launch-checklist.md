# Launch configuration

The implementation and isolated checks are complete. The following external information is still needed to activate production services.

- [x] Public contact: `info@legalmatestaffing.com` (user supplied).
- [x] Default destination documented as the same inbox.
- [ ] Approved canonical website origin. Do not infer from the email domain. Until configured, the build is noindex.
- [ ] Resend account/key and verified sender domain.
- [ ] Confirm that the notification inbox is monitored and can receive the sender's email.
- [ ] Persistent Upstash Redis URL/token and a generated HMAC secret.
- [ ] Actual scheduling URL. Until configured, booking CTAs are omitted.
- [ ] Optional phone, WhatsApp, LinkedIn, and location, only if actively used and approved.
- [ ] Optional GA4 measurement ID and reviewed stream settings; analytics is off until configured and consented.
- [ ] Company review of privacy notice, inbox retention, staffing terms, and any jurisdiction-specific requirements.
- [ ] One controlled live lead: internal notification, prospect confirmation, delivery logs, and attribution.
- [ ] One live booking-link check at all enabled entry points.
- [ ] Production domain, robots, sitemap, canonical, OpenGraph, and mobile smoke test.

## Future evidence improvements

Not prerequisites to showing an honest website: approved founder portraits, verified software familiarity, consented real candidate profiles, named client testimonials, case studies, and approved published pricing. The content model supports these without placeholder evidence.

## Operational monitoring

Track `lead_configuration_missing` and `lead_failed` as actionable errors. Review `lead_rate_limited` for spam or thresholds affecting legitimate prospects. Use Resend's delivery/bounce/suppression view and provider IDs in the logs to follow accepted requests through delivery. Assign an owner for replies and retention. The repository intentionally does not claim a response-time SLA.
