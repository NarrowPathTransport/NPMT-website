# Claude Code Guide: Narrow Path Medical Transport Website

## What this repository is

This is the public-facing website for Narrow Path Medical Transport. It is a dependency-free static site.

- Repository: `NarrowPathTransport/NPMT-website`
- Production branch: `main`
- Hosting: Netlify project `npmt-website`
- Production domain: `https://narrowpathtransport.com`
- Netlify deploys production from pushes to `main`.

Do not edit site content in Netlify. Make source changes in this repository, commit them to `main`, then confirm the Netlify production deploy succeeded.

## File map

- `index.html`: homepage
- `services.html`, `facilities.html`, `about.html`, `questions.html`, `contact.html`: primary pages
- `css/site.css`: site-wide design tokens, layout, responsive styles, and components
- `js/site.js`: small dependency-free behaviors
- `assets/`: images and other visual assets

## Working method

1. Read this file and inspect the relevant page, `css/site.css`, and `js/site.js` before editing.
2. Keep changes narrowly scoped to the requested section.
3. Preserve existing brand tokens, typography, responsive behavior, and components unless the owner explicitly asks for a redesign.
4. Test the affected page at desktop and mobile widths.
5. Commit with a clear message and push to `main`.
6. Confirm the Netlify production deploy and test the public URL.

## Design system

- Body font: Source Sans 3
- Display font: Fraunces
- Core colors: `--pine`, `--gold`, `--cream`, and related variables in `css/site.css`
- Reuse existing CSS classes and variables. Do not create near-duplicate colors or one-off typography systems.
- The hero's large emphasized phrase uses the existing `h1 em` treatment. Inline hero emphasis uses `.hero__lede em`.

## Operational and content guardrails

- Do not put patient information, trip details, health information, passwords, or account credentials in the repository or chat.
- Do not add, remove, or publish claims about service availability, pricing, coverage area, insurance, safety, regulatory status, or facility commitments without explicit owner confirmation.
- Do not state or imply an accident-free safety record.
- Preserve the current booking links unless the owner explicitly provides a replacement.
- Treat requested wording as exact when the owner specifies exact copy.

## First prompt for Claude Code

```
Read CLAUDE.md, inspect the current homepage and global stylesheet, then summarize the site structure and recent relevant changes. Do not edit anything yet.
```
