# Narrow Path Transport Website Guardrails

## Public truth standard

The website must describe only services NPT is currently authorized, insured, staffed, equipped, and prepared to deliver. Never quote a rate, accept a service, or commit to a date before those conditions are met.

Current status must come from Russ or the current project state. Do not infer it from old copy, chat history, Git history, screenshots, or this handoff.

## Privacy and patient information

- No PHI in Git, Claude Code, website forms, analytics, logs, issue trackers, email drafts, or documentation.
- Do not request names plus medical details, diagnoses, appointment purpose, insurance identifiers, clinical mobility information, or patient-specific trip records on the public website.
- Patient and trip records belong in the approved dispatch system.
- Microsoft email or Microsoft Bookings does not automatically make a public workflow HIPAA compliant.
- Do not add analytics, session replay, chat widgets, form processors, mapping, or payment vendors without privacy and contract review.
- If identifiable patient information appears during development, stop, do not reproduce it, and tell Russ to move it to the approved system.

## Service and geography boundaries

- Ohio Medicaid is closed unless Russ reopens it.
- Kentucky is closed.
- Dayton is guardrailed under current project instructions, even though the live site currently names Montgomery County and Dayton-area cities. Confirm before repeating or editing that claim.
- Growth sequence is stretcher, bariatric, multi-vehicle, expanded service area, then Northern Kentucky. A lane stays closed until Russ opens it.
- Do not advertise stretcher, bariatric, interstate, emergency, or another closed service.
- Do not research or implement NPT stretcher licensing/equipment/staffing merely because the website mentions a future service. That lane is not open.

## Claims requiring owner confirmation

Confirm before publishing or materially editing:

- Service area and city/county lists.
- Operating days, hours, booking windows, and same-day availability.
- Wheelchair type, passenger size, companion, stair, securement, and assistance capabilities.
- Pricing method, loaded mileage, wait time, fees, payment methods, payer treatment, invoice terms, and refunds.
- Insurance, licensure, authority, screening, training, maintenance, safety, response time, on-time performance, and documentation claims.
- Facility relationships, certificates on file, client lists, testimonials, outcomes, trip volume, history, or track record.

Never make a clean-safety-record claim. Describe systems and experience accurately and let insurers obtain loss runs.

## Compliance review triggers

Name the material risk and obtain the appropriate review before public changes involving:

- Operating authority, NEMT/ambulette classification, PUCO, or USDOT/FMCSA applicability: relevant agency or transportation attorney.
- ADA vehicle/service statements or digital accessibility: qualified ADA counsel or accessibility specialist.
- Insurance: licensed commercial insurance broker/carrier.
- Contracts, waivers, terms, cancellation policy, or privacy notice: healthcare/transportation attorney.
- Employment or worker-classification claims: employment counsel and payroll/tax professional.
- Tax, payment, invoicing, refunds, or pricing representations: CPA/tax professional and payment vendor.
- PHI, HIPAA, forms, analytics, Bookings, or vendor data flow: healthcare privacy counsel and each vendor's security/compliance contact.

## Brand and intellectual integrity

- Do not use nonpublic information, client lists, pricing, or documents from a current or former employer.
- Do not fabricate proof, reviews, credentials, affiliations, awards, results, or history.
- Do not use faith as a performance claim or condition of service. Russ approved faith and the slogan in marketing on September 28, 2026, without overdoing it; do not expand faith content by default.
- Preserve the grandparent standard in operations, but do not turn it into unsupported guarantees.

## Development safety

- Never commit secrets, tokens, DNS exports, private keys, passwords, patient data, or production database exports.
- Use environment variables and provider secret storage for any future server-side integration.
- Keep third-party dependencies minimal and review their licenses, security posture, data collection, and recurring cost.
- Do not alter DNS, domain registration, Microsoft email records, Netlify ownership, or GitHub access as part of ordinary website editing.
- Preserve a rollback point and verify deploy previews before production.
