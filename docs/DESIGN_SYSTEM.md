# Narrow Path Transport Website Design System

## Design intent

The site should feel calm, capable, warm, local, and trustworthy. It should not feel clinical, institutional, flashy, or like a generic startup template. Favor generous spacing, strong contrast, plain navigation, and restrained details.

## Core tokens

Use the existing CSS variables in `css/site.css` as the source of truth.

| Role | Token | Value |
|---|---|---|
| Primary pine | `--pine` | `#135948` |
| Deep pine | `--pine-deep` | `#0D3B30` |
| Soft pine | `--pine-soft` | `#397465` |
| Gold | `--gold` | `#D89929` |
| Light gold | `--gold-light` | `#E4B869` |
| Deep gold text | `--gold-deep` | `#976B1D` |
| Cream | `--cream` | `#F8F2E6` |
| Line | `--line` | `#E2D0AC` |
| Ink | `--ink` | `#22201C` |
| Soft ink | `--ink-soft` | `#55524A` |
| Paper | `--paper` | `#FFFFFF` |

Gold is an accent, not a large background color. Use it for hairlines, eyebrow text, the emblem, selected emphasis, and focus states. Cream provides warmth. Pine carries primary brand weight.

## Typography

- Display: Fraunces, with Georgia and Times New Roman fallbacks.
- Body: Source Sans 3, with system sans-serif fallbacks.
- Headings use restrained weight, compact line height, and balanced wrapping.
- Eyebrows use small uppercase text, wide letter spacing, and a short gold line.
- Do not introduce another font family without an explicit redesign decision.

## Approved homepage hero

The approved hero is a protected design and copy block:

- Full-width owned Cincinnati skyline/Roebling image.
- Minimum height approximately 560 to 760 pixels, responsive to viewport.
- Image crop centered horizontally and around 62 percent vertically.
- Layered deep-pine overlay for contrast and brand continuity.
- White headline with the final emphasized phrase in light-gold italic Fraunces.
- Gold kicker and restrained metadata row.
- Primary light `Request a ride` button and secondary light-outline `Call (513) 463-7284` button.
- The kicker may wrap on phones; its gold rule stays beside the first line.
- Desktop and mobile must preserve readable contrast and a clear CTA hierarchy.

Do not substitute the alternate `On time. Clean. Kind.` hero from the local `npmt-site` experiment.

## Components and layout

- Maximum content width: approximately 1140 pixels.
- Body measure: approximately 68 characters.
- Responsive gutters and section bands use the existing clamp-based rhythm.
- Cards use light borders, modest rounded corners, and restrained shadows.
- Pine sections use white text and gold accents.
- Interior page heroes use the existing deep-pine gradient and path glyph.
- Buttons remain large enough for touch and use the existing primary, light, outline, and ghost variants.
- Reuse the path rule, quote, standards, notices, cards, scheduling, and phone quick-actions components already present.

## Responsive and accessibility requirements

- Maintain visible keyboard focus: Gold Deep outline on light surfaces, Gold Light outline on pine surfaces.
- Preserve the skip link, semantic headings, descriptive alt text, and logical navigation order.
- Keep phone targets tappable and navigation usable at narrow widths.
- Honor reduced-motion preferences.
- Do not rely on color alone to communicate state.
- Avoid text over photography without the existing contrast veil.
- Test at 320, 375, 768, 1024, and wide desktop widths when a layout change is material.

## Asset rules

- The hero skyline image is owner-supplied and approved for use.
- Use the existing horizontal, stacked, and shield brand marks in their intended contexts.
- Do not stretch, recolor, outline, or add effects to brand marks.
- Optimize new raster assets without replacing the approved image crop or lowering visible quality.
- Keep the scheduling QR secondary to a direct clickable booking button.
