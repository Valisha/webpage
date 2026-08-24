# Boston Women in Bioinformatics — Brand Colors (Promotional Material)

This document is for designing **outside the website** — flyers, social media graphics, slide decks, printed materials, Canva designs, etc. It has no Tailwind classes or CSS variables, just the raw hex/RGB values a design tool needs.

**Source of truth**: all values below are copied from [`COLOR_PALETTE.md`](COLOR_PALETTE.md)'s Design Tokens Reference, which is generated from [`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro). If a brand color changes on the website, update `COLOR_PALETTE.md` first, then sync the swatch here.

---

## Core Brand Colors

Use these for anything meant to carry BWIB's identity — headers, buttons, key callouts.

| Color           | Hex       | RGB                 | Use                                                                   |
| --------------- | --------- | ------------------- | --------------------------------------------------------------------- |
| **Primary**     | `#0161EF` | `rgb(1, 97, 239)`   | Main brand blue — logos, headers, primary CTAs                        |
| **Secondary**   | `#0154CF` | `rgb(1, 84, 207)`   | Darker blue — secondary emphasis, supporting elements                 |
| **Accent**      | `#6D28D9` | `rgb(109, 40, 217)` | Purple — highlights, special callouts                                 |
| **Accent Warm** | `#E36D1D` | `rgb(227, 109, 29)` | Orange — urgent/featured CTAs only. Use sparingly (10–20% of designs) |

## Neutrals

| Color      | Hex       | Use                                       |
| ---------- | --------- | ----------------------------------------- |
| White      | `#FFFFFF` | Primary background                        |
| Light Gray | `#F9FAFB` | Soft background / card fill               |
| Near-Black | `#0F172A` | Body text, headlines on light backgrounds |

---

## Accent Set (for multi-item / infographic-style pieces)

The website uses a second, wider set of colors when a design needs to tell several same-level items apart — category tags, a row of stats, chart legend entries. Each hue has a light tint for fills and a solid shade for text/icons/borders:

| Hue    | Light Tint | Solid     | Use                   |
| ------ | ---------- | --------- | --------------------- |
| Blue   | `#EFF6FF`  | `#2563EB` | Category 1 / series 1 |
| Green  | `#F0FDF4`  | `#16A34A` | Category 2 / series 2 |
| Purple | `#FAF5FF`  | `#9333EA` | Category 3 / series 3 |
| Pink   | `#FDF2F8`  | `#DB2777` | Category 4 / series 4 |
| Orange | `#FFF7ED`  | `#EA580C` | Category 5 / series 5 |
| Teal   | `#F0FDFA`  | `#0D9488` | Category 6 / series 6 |

Reach for this set when a piece has multiple parallel items that need distinct colors (e.g. a stats infographic, a multi-track event flyer). Don't use it for a single-color piece — use the Core Brand Colors above instead.

---

## The Logo's Rainbow Ring

The website's warm-accent orange is explicitly designed as one note pulled from the logo's rainbow ring (yellow → orange → pink → purple → blue → green). That ring is a painted gradient in the logo artwork, not a fixed set of hex codes — if a design needs to echo the logo's exact gradient colors, use your design tool's eyedropper directly on `src/assets/images/WIB_Logo.jpg` rather than guessing a hex value.

---

## Print Notes

- All values above are screen-calibrated (hex/RGB), meant for digital use (web, social, slides).
- For anything physically printed (posters, business cards, banners), don't hand-convert RGB to CMYK — import the hex codes into your design software and let it convert using a proper color profile, then proof a physical sample before a full print run. Saturated blues and purples in particular often shift when printed.
- `accent-warm` becomes lime green (`#84CC16`) specifically for the website's _dark mode_ UI — that swap is a screen-contrast decision, not a general "dark version of the brand." Promotional material on a dark background should still default to the Core Brand Colors above unless you're deliberately recreating the website's dark mode look.
