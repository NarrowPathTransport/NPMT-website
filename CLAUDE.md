# Narrow Path Transport Website Claude Code Guide

## Purpose

This repository powers the public Narrow Path Transport website. Protect the live site first. Make small, reviewable changes against the real Git source, preserve approved design and copy, and never convert an unresolved idea into a public promise.

Read every file in `docs/` before the first edit.

## Production baseline

- Public brand: Narrow Path Transport, or NPT.
- Legal entity when precision matters: Narrow Path Medical Transport LLC, or NPMT.
- Production URL: `https://narrowpathtransport.com`.
- `https://www.narrowpathtransport.com` redirects to the primary domain.
- Hosting: Netlify project `narrowpathtransport` (site ID `a20aa6a2-6b85-47fc-b75a-8d00d24dced4`). The old `npmt-website.netlify.app` prototype address no longer resolves.
- Source repository: `NarrowPathTransport/NPMT-website` (GitHub canonical name `npmt-website`). The repository is public, so everything committed here is visible on GitHub.
- Production branch: `main`.
- Recorded deployment path: pushes to `main` deploy through Netlify.
- Current implementation: dependency-free static HTML, CSS, and JavaScript. The live layout matches the local `npmt-static` implementation, not the separate `npmt-site` experiment.
- Netlify publishes the repository root. `_redirects` returns 404 for `CLAUDE.md` and `docs/*` so internal files are not served as web pages. `_headers` sets basic security headers.
- Public phone for everything NPT: (513) 463-7284, also written (513) 463-PATH. Link as `tel:+15134637284`.
- Production baseline: tag `live-baseline-2026-09-28` on commit `1dc631a` (Netlify deploy `6aba58c5f0b89a00083b8ed3`).
- Live status above was rechecked on September 28, 2026. Recheck before making deployment or DNS claims later.

Do not edit the site in Netlify. Do not replace the static architecture, change hosting, alter DNS, or change the production branch unless Russ explicitly approves that scope.

## First-session procedure

1. Confirm this is the real Git repository and run `git status`.
2. Read `CLAUDE.md` and all files in `docs/`.
3. Inspect the affected HTML file, `css/site.css`, `js/site.js`, and related assets.
4. Compare the local page with the production URL before editing.
5. If the production source commit is known, create the protected baseline tag described below before substantial work.
6. Summarize the proposed change and any affected public claim. Do not edit until the requested scope is clear.

## Change rules

- Preserve the approved homepage hero copy and visual treatment exactly unless Russ explicitly requests a revision. The current approved version is recorded in `docs/COPY.md` (revised September 28, 2026).
- Reuse current tokens, components, typography, spacing, and responsive patterns. Do not create a second design system.
- Keep changes narrow. Do not redesign unrelated sections while fixing one issue.
- Treat rates, operating hours, service area, same-day availability, accepted service types, payer/payment statements, credentials, insurance, and safety claims as current operational facts that require owner confirmation before publishing.
- Never invent a rate, service, date, capability, credential, result, testimonial, or compliance claim.
- Do not add forms that collect patient, medical, trip, or other protected information. Follow `docs/GUARDRAILS.md`.
- Do not add secrets, credentials, patient data, production exports, or private records to Git.
- Do not force-push, rewrite published history, move the baseline tag, or commit directly to `main` for substantial work.

## Required validation

Before proposing a merge or push:

- Test every changed page at desktop and phone widths.
- Test navigation, keyboard focus, skip link, visible focus states, text contrast, images, and reduced-motion behavior.
- Test the Microsoft Bookings link, click-to-call link, email link, internal links, favicon, robots file, sitemap, canonical metadata, and social metadata when affected.
- Confirm no content requests diagnoses, medical details, or identifiable patient information.
- Check that no unapproved service, geography, rate, payer, or operational promise was introduced.
- Use a Netlify deploy preview for review when available. Verify the live URL after merge.

## Recommended Git baseline and release workflow

After cloning, identify the exact `main` commit that produced the current live Netlify deploy. Only tag after the commit and live deploy are reconciled.

Completed for the September 28, 2026 baseline. Tag the verified commit explicitly rather than whatever `main` points to:

```bash
git fetch origin
git tag -a live-baseline-2026-09-28 1dc631a18fadb8e2d2e5002a7a59312456af1272 -m "Production baseline: Netlify deploy 6aba58c5f0b89a00083b8ed3, commit 1dc631a"
git push origin refs/tags/live-baseline-2026-09-28
```

If the live Netlify deploy does not match `origin/main`, stop and reconcile it before tagging.

For later work:

```bash
git switch -c feature/short-description
# make one scoped change and validate it
git add <specific-files>
git commit -m "Describe the user-visible change"
git push -u origin feature/short-description
```

Review the deploy preview, then merge to `main`. Keep `live-baseline-2026-09-28` immutable. Use new annotated tags for intentional releases, for example `release-2026-10-05-v1`.

## Current priority

Preserve the live site while confirming the public claims listed in `docs/BACKLOG.md`. The pricing dashboard is a concept only. Do not build or publish it until its pricing rules, privacy boundary, routing provider, quote status, booking handoff, and payment flow are approved.

## Safe first prompt

```text
Read CLAUDE.md and every file in docs/. Inspect the current production source and compare it with https://narrowpathtransport.com. Summarize the architecture, approved hero, operational claims that need confirmation, and the smallest safe next change. Do not edit anything yet.
```
