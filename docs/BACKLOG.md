# Narrow Path Transport Website Backlog

This backlog separates confirmation work from approved implementation. Items are not authorization to change the public site.

## Priority 0 Preserve and reconcile the live baseline

- [x] Clone `NarrowPathTransport/NPMT-website` and confirm `origin/main` is the Netlify production source.
- [x] Match the current live deploy to an exact Git commit (`1dc631a`, deploy `6aba58c5f0b89a00083b8ed3`).
- [x] Create the immutable annotated tag `live-baseline-2026-09-28`.
- [ ] Make the GitHub repository private, or accept that internal docs are public on GitHub.
- [ ] Turn on two-factor sign-in for Netlify and GitHub.
- [ ] Confirm Netlify deploy previews work before the next public change.
- [ ] Treat `npmt-static` as a reference snapshot only and keep the alternate `npmt-site` experiment out of production.

## Priority 1 Confirm public operational claims

- [ ] Resolve the conflict between the live five-county/Montgomery/Dayton language and the current Dayton guardrail.
- [ ] Confirm whether same-day service remains accurate.
- [ ] Confirm operating days and hours.
- [ ] Confirm wheelchair types, securement language, assistance level, companions, wait/return, and discharge/transfer capability.
- [ ] Confirm private-pay, facility-direct, loaded-mile, card/electronic payment, and invoice statements.
- [ ] Confirm driver screening, training, insurance, maintenance, documentation, and facility-support claims.
- [x] Faith direction settled September 28, 2026: allowed in marketing, do not overdo it.
- [ ] Confirm the public brand name on the site (currently Narrow Path Medical Transport; Bookings logo says Narrow Path Transport).
- [ ] Confirm staffing and written-program claims (drivers plural, hiring checks, drug testing, written fatigue and maintenance programs, signature capture, incident reporting).
- [ ] Confirm the regulatory wording (operating authority, license, authorized).

Until confirmed, do not repeat these claims in new pages, metadata, structured data, social posts, or paid listings.

## Priority 2 Pre-launch quality and conversion pass

- [x] Fix phone-width header overflow that pushed the Menu button off-screen (September 28, 2026).
- [x] Add favicon, branded 404 page, canonical and social tags on every page, and security headers.
- [ ] Replace the 1000 px hero image with a larger original of the same photo (same crop) and confirm ownership.
- [ ] Test every navigation link, Bookings link, QR code, phone link, and email link.
- [ ] Test Home, Services, Facilities, About, Questions, and Contact on common phone and desktop widths.
- [ ] Confirm page titles, descriptions, canonical URLs, Open Graph image/text, favicon, `robots.txt`, and `sitemap.xml`.
- [ ] Run an accessibility pass for keyboard navigation, focus order, contrast, headings, alt text, reduced motion, and mobile targets.
- [ ] Review public privacy language and the Bookings data flow with healthcare privacy counsel/vendor contacts.
- [ ] Confirm no Netlify badge or other platform branding appears publicly.
- [ ] Connect and verify Google Search Console only after ownership and canonical URLs are stable.

## Priority 3 Microsoft Bookings review

- [ ] Confirm the Bookings page, services, availability, confirmation text, reminders, and staff permissions reflect current operations.
- [ ] Remove any field that requests unnecessary medical information.
- [ ] Remove Lift Assist and Wellness Check unless Russ confirms them as offered services.
- [ ] Remove the home street address and update the business phone to (513) 463-7284.
- [ ] Reconcile posted Bookings rates with the site's individually quoted pricing language.
- [ ] Clarify whether a selected time is a request, a provisional hold, or a confirmed trip.
- [ ] Confirm who monitors requests and the response-time expectation.
- [ ] Confirm retention, export, and access-control settings.

## Priority 4 Proposed pricing dashboard discovery

**Status: concept only.**

- [ ] Approve the underlying financial model and exact pricing rules.
- [ ] Define estimate, quote, and booking-confirmation states.
- [ ] Define required inputs and exception-handling without PHI.
- [ ] Select and price the routing provider.
- [ ] Decide address processing and retention rules.
- [ ] Define manual review, quote expiration, and capacity checks.
- [ ] Decide Microsoft Bookings handoff.
- [ ] Decide payment timing, processor, cancellation/refund rules, and facility billing treatment.
- [ ] Complete privacy, security, accessibility, tax, insurance, and legal review.
- [ ] Build a non-production prototype only after the decisions above are documented.

## Deferred unless Russ opens the lane

- Stretcher website research or promotion.
- Bariatric service promotion.
- Multi-vehicle claims.
- Expanded service area, including Dayton if still guardrailed.
- Kentucky or interstate service.
- Ohio Medicaid marketing or billing claims.
- Public contact/intake form collecting patient or trip details.
- Full framework migration or hosting change.

## Definition of done for any website change

- Scope approved and public claims confirmed.
- Change made on a feature branch with a clear commit.
- Desktop, mobile, keyboard, and content checks pass.
- Deploy preview reviewed.
- No PHI, secret, unapproved service, unsupported claim, or accidental architecture change introduced.
- Production verified after merge, with a documented rollback commit/tag.
