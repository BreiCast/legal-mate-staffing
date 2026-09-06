# Content and evidence audit

Reviewed the original `src/content/siteContent.ts`, both generations of marketing components, the form/contact paths, and every image in `public/images` before replacing their usage.

| Original issue                                                                                   | Decision                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “Trusted by law firms nationwide” and trust strip of practice-area names                         | Removed. No firm logo or testimonial was supplied. Practice areas now have clearly labeled service links.                                                               |
| 24-hour turnaround, placement within two weeks, available in five days, one-day response promise | Removed. Timeline is discussed after scoping.                                                                                                                           |
| Active candidate counts and activity-style indicators                                            | Removed. No live candidate inventory exists.                                                                                                                            |
| Sample name, four years of experience, named software familiarity                                | Replaced with explicitly labeled illustrative role profiles, no simulated identity or years.                                                                            |
| Founder five-/four-year totals and broad experience headline                                     | Conservatively removed quantified totals. Qualitative duties come from the existing company biographies and user brief.                                                 |
| Attributed founder quotation                                                                     | Removed. No quote-approval record was supplied.                                                                                                                         |
| Savings, lower turnover, immediate productivity, fast replacement                                | Removed. Pricing and support are scoped in the written proposal/agreement.                                                                                              |
| Background-check, HIPAA-aware, and blanket training language                                     | Replaced with precise language about discussing checks, access expectations, supervision, and applicable requirements. No certifications or blanket compliance promise. |
| Empty booking/contact/social fields and `#` actions                                              | Replaced by validated optional configuration. Only the user-approved email is populated by default.                                                                     |
| Console-only form and unconditional success                                                      | Replaced with a bounded, validated server endpoint and provider-acceptance contract.                                                                                    |
| Generic legal/operations positioning                                                             | Legal roles lead. General operations has a secondary route and modest cross-link.                                                                                       |
| Different old page/component styles                                                              | Consolidated around one set of shared components and tokens.                                                                                                            |

## Sources and publication gates

- The user brief confirms legal-operator founding experience, bilingual LATAM positioning, targeted roles/practice areas, founder names, and LLC identity.
- Original company biographies provide the specific qualitative work experience used in founder copy.
- The user explicitly provided `info@legalmatestaffing.com` during implementation. It is the public contact and example lead destination.
- No company domain, phone, WhatsApp, LinkedIn, booking URL, exact rates, certifications, client proof, or software-specific evidence was approved.
- Founder portraits are not shown. `founder-1.jpg` appears to be a real portrait but its identity/permission is not documented; `founder-2.jpg` is a sky placeholder. Neither is used as a founder identity.
- Testimonial and metric arrays are empty; their components require explicit evidence/permission fields.
- Example cards are not job listings and do not imply candidate availability.

## Image decisions

Most original marketing images are neon/composited technology graphics, generic scales/city collages, or unrelated landscape placeholders. They are no longer referenced by the UI. A single licensed editorial office photograph supports the visual direction without claiming to depict Legal Mate's office, staff, founders, candidates, or clients. Original image assets are retained for provenance/review rather than silently repurposed as evidence.
