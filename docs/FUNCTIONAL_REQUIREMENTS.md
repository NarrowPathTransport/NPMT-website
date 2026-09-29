# Narrow Path Transport Website Functional Requirements

## Current required functions

### Navigation

- Provide clear access to Home, Services, For Facilities, About, Common Questions, and Contact.
- Show the current page state where practical.
- Keep mobile navigation keyboard-accessible and simple.

### Contact paths

- Phone: `(513) 463-7284` (also `(513) 463-PATH`), linked as `tel:+15134637284`. This is the NPT Google Voice line and the only phone number to publish.
- Email: `russ@narrowpathtransport.com`.
- Online scheduling: Microsoft Bookings.
- A scheduling QR code may appear as a secondary path, never as the only way to schedule.

### Microsoft Bookings

Current URL:

`https://outlook.office.com/book/NarrowPathTransport@narrowpathtransport.com/?ismsaljsauthenabled`

Requirements:

- Open external booking links in a new tab with `noopener noreferrer`.
- Use consistent CTA wording: `Request a ride`.
- On phones (560 px and narrower) the header booking button is replaced by the fixed `.quick-actions` bar with `Request a ride` and `Call now`.
- Do not expose a raw long URL to users when a button or descriptive link is available.
- Test the link from header, hero, contact page, footer, QR code, and any repeated CTA after related edits.
- Treat Bookings as the current handoff for choosing a time. Do not claim a trip is accepted or finally confirmed unless the actual process does that.
- The specific data collected in Bookings, its retention, permissions, and any required business associate agreement remain an operational/privacy review item.

### Privacy and forms

- No public patient-intake form is approved.
- Email routing alone does not make a website form HIPAA compliant.
- Do not collect diagnoses, medical history, insurance identifiers, mobility clinical details, or patient-specific trip records on the public site.
- Patient and trip records belong in the approved dispatch/intake system.
- A future low-risk callback form would still require approved fields, secure processing, retention rules, access controls, vendor review, and a privacy notice before implementation.

### SEO and performance

- Maintain one canonical production URL per page.
- Maintain useful titles, meta descriptions, Open Graph data, `robots.txt`, and `sitemap.xml`.
- Keep image dimensions and alt text accurate.
- Avoid heavy dependencies for simple behavior.
- Preserve fast rendering, responsive layout, and progressive enhancement.

## Proposed pricing dashboard concept

**Status: unresolved concept, not an implementation instruction.**

The concept is a public, low-friction trip-pricing experience that could help a visitor understand the likely cost before scheduling. It should be designed as a quote workflow, not a public rate promise.

Possible flow, subject to approval:

1. User selects a confirmed service type and one-way or round-trip structure.
2. User enters pickup and destination locations plus limited non-clinical logistics needed for pricing.
3. A routing provider returns distance and route information.
4. A separately maintained pricing rules engine applies owner-approved base, mileage, wait/return, after-hours, or other rules.
5. The interface clearly labels the result as an estimate or formal quote according to the approved business process.
6. The user may continue to Microsoft Bookings or request manual review.

Non-negotiable design constraints:

- No rates or fee rules may be invented or copied from competitors.
- Do not publish pricing until the economics support operating cost, owner compensation, taxes, insurance, and vehicle reserve.
- Keep pricing rules separate from the visual interface so they can be reviewed and changed safely.
- Do not expose mapping or payment secrets in client-side code.
- Minimize location-data retention. Do not log names, diagnoses, appointment purpose, patient identity, or other PHI.
- Define whether the result is an estimate, quote, or guaranteed price and who can override it.
- Provide a manual-review path for stairs, unusual accessibility needs, long waits, schedule constraints, or other exceptions without requesting clinical detail.
- Confirm ADA, privacy, security, mapping-provider, insurance, tax, and payment implications with the appropriate qualified reviewers/vendors.

## Pricing dashboard decisions still required

- Approved pricing model and effective date.
- Exact inputs and exceptions.
- Service area and lane eligibility logic.
- Mapping/routing provider, cost, key security, and terms.
- Whether addresses may be processed client-side, server-side, or not retained.
- Estimate versus binding-quote language.
- Manual review and quote expiration.
- Booking handoff and availability check.
- Payment timing, payment processor, refund/cancellation rules, receipts, and facility billing treatment.
- Accessibility testing and fallback for users who cannot use the map interface.

Do not build the dashboard until these decisions are approved in writing.
