# Narrow Path Transport Website Context

## Role of the site

The website is the public front door for Narrow Path Transport. It serves two primary audiences:

1. Adults, family members, and caregivers arranging non-emergency transportation.
2. Facility and care-team staff evaluating whether NPT is a dependable fit.

The intended experience is calm, direct, local, dignified, and low-friction. Scheduling should be obvious, contact information should be easy to find, and public copy should make the operating scope clear without collecting protected health information.

## Verified live state

Verified on September 28, 2026:

- `https://narrowpathtransport.com` is public over HTTPS.
- `https://www.narrowpathtransport.com` redirects to the primary domain.
- The live site contains Home, Services, For Facilities, About, Common Questions, and Contact pages.
- The live header and calls to action link to Microsoft Bookings.
- The approved homepage hero is live.
- No public contact form is present. Scheduling, phone, and email are the contact paths.
- The Powered by Netlify badge is not present in the checked public page.

Recorded project configuration:

- GitHub repository: `NarrowPathTransport/NPMT-website`.
- Netlify project: `narrowpathtransport` (site ID `a20aa6a2-6b85-47fc-b75a-8d00d24dced4`). Production deploy on September 28, 2026 was `6aba58c5f0b89a00083b8ed3` from commit `1dc631a`.
- Production branch: `main`.
- The GitHub-to-Netlify deployment connection was established in the prior website work.

Recheck these facts before relying on them in a future deployment change.

## Source of truth

The real GitHub repository and the live Netlify deployment are authoritative. In the ChatGPT project mirror:

- `npmt-static/` closely matches the current live site and is useful as a reference snapshot.
- `npmt-site/` is a separate Next.js/Vinext experiment with different hero copy and structure. It is not the live baseline and must not replace the production site by accident.
- The handoff package does not contain the website source itself. Install it at the root of the cloned production repository.

## Current site structure

- `index.html`: homepage and primary conversion path.
- `services.html`: wheelchair, ambulatory, recurring, discharge/transfer, pricing, and schedule information.
- `facilities.html`: facility-facing positioning and operating expectations.
- `about.html`: company purpose and story.
- `questions.html`: frequently asked questions.
- `contact.html`: phone, email, Microsoft Bookings, and privacy guidance.
- `css/site.css`: tokens, components, layout, accessibility, and responsive behavior.
- `js/site.js`: small progressive enhancements, including navigation and viewport behavior.
- `assets/img/`: owned skyline, brand marks, and scheduling QR image.
- `robots.txt` and `sitemap.xml`: search discovery files.
- `404.html`: branded not-found page (uses root-relative paths so it works at any URL).
- `favicon.ico`, `assets/img/favicon-32.png`, `assets/img/apple-touch-icon.png`: browser and home-screen icons made from the shield mark.
- `_redirects`: keeps `CLAUDE.md` and `docs/` from being served on the website.
- `_headers`: basic security headers.

## Settled website decisions

- Preserve the approved homepage hero copy and design.
- Keep the green, cream, gold, and white brand system.
- Keep Fraunces for display type and Source Sans 3 for body type.
- Keep the owned Cincinnati skyline and Roebling Suspension Bridge image as the hero image.
- Keep Microsoft Bookings as the current online scheduling destination.
- Keep phone, email, and online ride requests easy to reach. Public phone: (513) 463-7284.
- Keep the website out of the patient-record workflow. No PHI collection.
- Keep the site responsive, accessible, fast, SEO-aware, and simple to navigate.
- Preserve the dependency-free static architecture unless Russ approves a migration.

## Operational claims that are not settled by this handoff

The live site contains current-state claims that must be confirmed by Russ before they are edited, repeated, or expanded:

- Five-county service area, including Montgomery County and Dayton-area cities.
- Same-day service when the schedule allows.
- Monday-through-Thursday operating hours and weekend closure.
- Manual and power-wheelchair capability.
- Door-through-door assistance and four-point securement language.
- Private-pay and facility-direct billing terms.
- Loaded-mile pricing and no charge for travel to pickup.
- Card/electronic payment and facility invoice terms.
- Driver screening, training, insurance, documentation, and facility-support claims.

The current NPT project instructions guardrail Dayton and say current operating status must be freshly confirmed. Preserve the existing live baseline, but do not treat these claims as permanent decisions.

## Website positioning boundaries

- Public brand: Narrow Path Transport.
- Legal name: Narrow Path Medical Transport LLC when legal or entity precision matters.
- Current website scope is wheelchair and ambulatory NEMT only when owner-confirmed and operationally supported.
- Ohio Medicaid is not an open payer lane unless Russ reopens it.
- Kentucky is closed. Dayton is guardrailed. Stretcher, bariatric, multi-vehicle, expanded-area, and Northern Kentucky lanes remain closed until Russ opens them.
- Faith guides operations. As of September 28, 2026, Russ approved using faith and the slogan in marketing without overdoing it. Keep existing faith content proportionate and do not expand it by default.
