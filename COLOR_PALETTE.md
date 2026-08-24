# Boston Women in Bioinformatics - Color Palette Guide

This document describes the complete color system for the Boston Women in Bioinformatics website. All colors are centrally managed through CSS custom properties (design tokens) and Tailwind utility classes.

## Table of Contents

- [Quick Reference](#quick-reference)
- [Design Tokens Reference](#design-tokens-reference)
- [Tailwind Utility Classes](#tailwind-utility-classes)
- [Usage Examples](#usage-examples)
- [How to Update Colors](#how-to-update-colors)
- [Dark Mode](#dark-mode)
- [Categorical Color vs. Rhythm Color](#categorical-color-vs-rhythm-color)

---

## Quick Reference

### Brand Colors

| Color           | Light Mode | Dark Mode  | Hex/RGB                       | Use Case                                                                                                |
| --------------- | ---------- | ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Primary**     | Blue       | Blue       | `rgb(1 97 239)` / `#0161EF`   | Primary actions, links, accents                                                                         |
| **Secondary**   | Dark Blue  | Dark Blue  | `rgb(1 84 207)` / `#0154CF`   | Secondary actions, hover states                                                                         |
| **Accent**      | Purple     | Purple     | `rgb(109 40 217)` / `#6D28D9` | Highlights, special elements                                                                            |
| **Accent Warm** | Orange     | Lime Green | `#e36d1d` / `#84cc16`         | Warm highlights, CTAs, featured content - automatically switches between orange (light) and lime (dark) |

**These four brand colors are text/border/icon colors, not section background colors.** Across the codebase they're used as `text-*`/`border-*` (76 and 42 uses respectively) and as small solid-fill icon badges/avatars — never as a full-width `bg-*` fill on their own. For large surfaces (page sections, cards, callouts), use a **pastel tint** of the relevant hue instead — `bg-blue-50`/`bg-purple-50`/`bg-orange-50` in light mode, `dark:bg-slate-800` (or a matching `-900`/`-950` shade) in dark mode. This pastel-tint approach is used 98 times across the site and is the actual "block color" language — see [Homepage Section Backgrounds](#homepage-section-backgrounds) below for a concrete example.

### Sponsorship Tier Colors

| Tier       | Hex       | Use Case                             |
| ---------- | --------- | ------------------------------------ |
| **Gold**   | `#d4af37` | Gold sponsor badges, borders, text   |
| **Silver** | `#a3a3a3` | Silver sponsor badges, borders, text |

### Social Media Brand Colors

| Platform      | Hex                                                 | Color                  |
| ------------- | --------------------------------------------------- | ---------------------- |
| **LinkedIn**  | `#0077b5`                                           | LinkedIn Blue          |
| **Instagram** | `#e4405f`                                           | Instagram Pink/Red     |
| **Facebook**  | `#39569c`                                           | Facebook Blue          |
| **Twitter**   | `#00acee`                                           | Twitter Blue           |
| **Bluesky**   | `#00acee`                                           | Bluesky Blue           |
| **GitHub**    | `rgb(17 24 39)` (light) / `rgb(203 213 225)` (dark) | Dark Gray / Light Gray |

### Semantic Colors

| Color       | Light Mode                 | Use Case                            |
| ----------- | -------------------------- | ----------------------------------- |
| **Success** | `rgb(34 197 94)` / Green   | Success messages, positive actions  |
| **Warning** | `rgb(251 146 60)` / Orange | Warnings, caution messages          |
| **Error**   | `#e74c3c` / Red            | Error messages, destructive actions |
| **Info**    | `rgb(59 130 246)` / Blue   | Information, tips                   |

---

## Design Tokens Reference

All colors are defined in [`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro) as CSS custom properties.

### Brand Colors

```css
/* Light Mode (:root) */
--aw-color-primary: rgb(1 97 239);
--aw-color-secondary: rgb(1 84 207);
--aw-color-accent: rgb(109 40 217);
--aw-color-accent-warm: #e36d1d; /* Orange from logo rainbow */

/* Dark Mode (.dark) */
--aw-color-primary: rgb(1 97 239);
--aw-color-secondary: rgb(1 84 207);
--aw-color-accent: rgb(109 40 217);
--aw-color-accent-warm: #84cc16; /* Lime green for dark mode - lime-500 */
```

### Sponsorship Tier Colors

```css
--aw-color-tier-gold: #d4af37;
--aw-color-tier-silver: #a3a3a3;
```

### Social Media Brand Colors

```css
--aw-color-social-linkedin: #0077b5;
--aw-color-social-instagram: #e4405f;
--aw-color-social-facebook: #39569c;
--aw-color-social-twitter: #00acee;
--aw-color-social-bluesky: #00acee;
--aw-color-social-github: rgb(17 24 39); /* Light mode */
```

### Semantic Colors

```css
--aw-color-success: rgb(34 197 94);
--aw-color-warning: rgb(251 146 60);
--aw-color-error: #e74c3c;
--aw-color-info: rgb(59 130 246);
```

### Text Colors

```css
/* Light Mode */
--aw-color-text-heading: rgb(0 0 0); /* Black */
--aw-color-text-default: rgb(16 16 16); /* Near Black */
--aw-color-text-muted: rgb(16 16 16 / 66%); /* Muted Gray */
--aw-color-text-dark: #2c3e50; /* Dark Blue-Gray */

/* Dark Mode */
--aw-color-text-heading: rgb(247, 248, 248); /* Near White */
--aw-color-text-default: rgb(229 236 246); /* Light Blue-Gray */
--aw-color-text-muted: rgb(229 236 246 / 66%); /* Muted Light */
--aw-color-text-dark: rgb(203 213 225); /* Slate 300 */
```

### Background Colors

```css
/* Light Mode */
--aw-color-bg-page: rgb(255 255 255); /* White */
--aw-color-bg-page-dark: rgb(3 6 32); /* Very Dark Blue */

/* Dark Mode */
--aw-color-bg-page: rgb(3 6 32); /* Very Dark Blue */
```

### Border Colors

```css
/* Light Mode */
--aw-border-color: #ddd; /* Light Gray */
--aw-border-color-accent: #3498db; /* Blue */

/* Dark Mode */
--aw-border-color: rgb(51 65 85); /* Slate 700 */
--aw-border-color-accent: rgb(59 130 246); /* Blue 500 */
```

---

## Tailwind Utility Classes

All design tokens are exposed as Tailwind utility classes via [`tailwind.config.js`](tailwind.config.js).

### Usage in Components

#### Brand Colors

```html
<!-- Text -->
<p class="text-primary">Primary blue text</p>
<p class="text-secondary">Secondary dark blue text</p>
<p class="text-accent">Accent purple text</p>
<p class="text-accent-warm">Warm orange text</p>

<!-- Background -->
<div class="bg-primary">Primary blue background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-accent-warm">Warm accent background</div>

<!-- Border -->
<div class="border-primary">Primary blue border</div>
<div class="border-accent-warm">Warm accent border</div>
```

#### Sponsorship Tier Colors

```html
<!-- Gold Tier -->
<span class="text-gold">Gold Sponsor</span>
<div class="border-gold border-4">Gold sponsor box</div>

<!-- Silver Tier -->
<span class="text-silver">Silver Sponsor</span>
<div class="border-silver border-4">Silver sponsor box</div>

<!-- Using CSS classes (defined in global.css) -->
<span class="gold">Gold text with bold</span>
<div class="gold-border">Gold border box</div>
```

#### Social Media Colors

```html
<!-- LinkedIn -->
<a href="#" class="text-social-linkedin hover:text-gray-900 dark:hover:text-white"> LinkedIn Icon </a>

<!-- Instagram -->
<a href="#" class="text-social-instagram hover:text-gray-900 dark:hover:text-white"> Instagram Icon </a>

<!-- Facebook -->
<a href="#" class="text-social-facebook hover:text-gray-900 dark:hover:text-white"> Facebook Icon </a>

<!-- Twitter -->
<a href="#" class="text-social-twitter hover:text-gray-900 dark:hover:text-white"> Twitter Icon </a>

<!-- GitHub -->
<a href="#" class="text-social-github hover:text-gray-900 dark:hover:text-white"> GitHub Icon </a>
```

#### Text Colors (Semantic)

```html
<p class="text-default">Default body text</p>
<p class="text-muted">Muted secondary text</p>
```

---

## Usage Examples

### Example 1: Button with Brand Colors

```astro
<!-- Primary Button (Cool tone - professional) -->
<button class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full"> Learn More </button>

<!-- Accent Button (Cool tone - special) -->
<button class="bg-accent hover:bg-purple-700 text-white px-6 py-3 rounded-full"> Special Action </button>

<!-- Warm Accent Button (Warm tone - featured CTA) -->
<!-- Automatically orange in light mode, lime green in dark mode -->
<button class="bg-accent-warm hover:bg-red-500 dark:hover:bg-lime-600 text-gray-900 px-6 py-3 rounded-full">
  Register Now
</button>
```

### Example 2: Sponsor Card

```astro
<div class="border-4 border-gold bg-white rounded-xl p-4 shadow-lg">
  <h3 class="text-gold font-bold">Gold RNA Sponsor</h3>
  <img src="/sponsors/logo.png" alt="Sponsor Logo" />
</div>
```

### Example 3: Social Media Links (Team Component)

```jsx
{
  /* LinkedIn */
}
<a href={member.social.linkedin} className="text-social-linkedin hover:text-gray-900 dark:hover:text-white">
  <LinkedInIcon />
</a>;

{
  /* Instagram */
}
<a href={member.social.instagram} className="text-social-instagram hover:text-gray-900 dark:hover:text-white">
  <InstagramIcon />
</a>;
```

### Example 4: Alert Messages (Semantic Colors)

```astro
<!-- Success -->
<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">Success message</div>

<!-- Error -->
<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">Error message</div>

<!-- Warning -->
<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">Warning message</div>
```

### Example 5: Warm vs Cool Accent Usage

```astro
<!-- Featured Event (use warm accent for emphasis) --><!-- Note: bg-accent-warm automatically becomes lime green in dark mode -->
<div class="border-l-4 border-accent-warm bg-orange-50 dark:bg-slate-800 p-4">
  <h3 class="text-accent-warm font-bold">Featured: 10th Year Anniversary</h3>
  <p>Join us for our special celebration!</p>
  <button class="bg-accent-warm hover:bg-red-500 dark:hover:bg-lime-600 text-gray-900 px-4 py-2 rounded-full">
    RSVP Now
  </button>
</div>

<!-- Regular Event (use cool accent for standard styling) -->
<div class="border-l-4 border-accent bg-purple-50 dark:bg-slate-800 p-4">
  <h3 class="text-accent font-bold">Monthly Meetup</h3>
  <p>Join our regular monthly gathering</p>
  <button class="bg-accent hover:bg-purple-700 text-white px-4 py-2 rounded-full"> Learn More </button>
</div>
```

### Example 6: Using CSS Variables Directly

```astro
<style>
  .custom-element {
    color: var(--aw-color-primary);
    background-color: var(--aw-color-bg-page);
    border-color: var(--aw-border-color);
  }

  .gold-sponsor-badge {
    color: var(--aw-color-tier-gold);
    border: 2px solid var(--aw-color-tier-gold);
  }

  .featured-cta {
    background-color: var(--aw-color-accent-warm);
    color: white;
  }
</style>
```

### Example 7: Homepage Section Backgrounds

`src/pages/index.astro`'s top-level `<section>` blocks rotate through three pastel background tints, in order, so every section is visually separated from its neighbor as a plain rhythm device:

```astro
<!-- 1st in rotation -->
<section class="bg-white dark:bg-dark">...</section>

<!-- 2nd in rotation -->
<section class="bg-gray-50 dark:bg-slate-800">...</section>

<!-- 3rd in rotation -->
<section class="bg-blue-50 dark:bg-blue-950">...</section>

<!-- repeats: white, gray-50, blue-50, white, gray-50, blue-50, ... -->
```

See `AGENTS.md` Local Norm 24 for the full rule, including guidance for adding/reordering sections.

---

## How to Update Colors

### Changing an Existing Color

1. Open [`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro)
2. Find the CSS variable you want to change (e.g., `--aw-color-primary`)
3. Update the color value in **both** `:root` (light mode) and `.dark` (dark mode) sections if applicable
4. Save the file - the change will apply site-wide automatically

**Example**: Changing the primary brand color from blue to teal

```css
/* Before */
--aw-color-primary: rgb(1 97 239); /* Blue */

/* After */
--aw-color-primary: rgb(20 184 166); /* Teal */
```

### Adding a New Color

1. **Add the CSS variable** in [`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro):

   ```css
   :root {
     /* ... existing colors ... */
     --aw-color-custom: #ff5733; /* Your new color */
   }

   .dark {
     /* ... existing colors ... */
     --aw-color-custom: #ff8866; /* Dark mode variant if needed */
   }
   ```

2. **Expose it to Tailwind** in [`tailwind.config.js`](tailwind.config.js):

   ```js
   colors: {
     // ... existing colors ...
     'custom': 'var(--aw-color-custom)',
   }
   ```

3. **Use it in components**:
   ```html
   <div class="text-custom bg-custom border-custom">New custom color!</div>
   ```

### Best Practices

✅ **DO**:

- Always use CSS custom properties (design tokens) for colors
- Use Tailwind utility classes (`text-primary`, `bg-gold`, etc.)
- Update colors in `CustomStyles.astro` only
- Test in both light and dark modes
- Document new colors in this file

❌ **DON'T**:

- Use hardcoded hex values like `#0161EF` directly in components
- Use inline styles with color values
- Define colors in multiple places
- Forget to add dark mode variants when needed

---

## Dark Mode

The site uses Tailwind's class-based dark mode strategy (`darkMode: 'class'` in `tailwind.config.js`).

### How Dark Mode Works

1. Dark mode is toggled by adding/removing the `.dark` class on the root HTML element
2. CSS variables in `.dark { }` override the `:root` values
3. Tailwind's `dark:` variant applies styles only in dark mode

### Dark Mode Color Guidelines

**Text Colors**:

- Light mode: Use darker colors (black, dark gray)
- Dark mode: Use lighter colors (white, light gray, slate)
- **Standard**: `text-gray-900 dark:text-slate-100`

**Background Colors**:

- Light mode: White or light backgrounds
- Dark mode: Dark blue (`rgb(3 6 32)`) or dark slate
- **Standard**: `bg-white dark:bg-slate-900`

**Borders**:

- Light mode: `#ddd` (light gray)
- Dark mode: `rgb(51 65 85)` (slate-700)
- **Standard**: `border-gray-300 dark:border-slate-700`

### Dark Mode Examples

```html
<!-- Text -->
<p class="text-gray-800 dark:text-slate-100">Automatically switches in dark mode</p>

<!-- Background -->
<div class="bg-white dark:bg-slate-800">White in light mode, dark slate in dark mode</div>

<!-- Complex Component -->
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 border border-gray-300 dark:border-slate-700">
  Full dark mode support
</div>
```

### Consistent Dark Mode Palette

We standardize on **slate** colors for dark mode (not gray):

| Light Mode        | Dark Mode                            |
| ----------------- | ------------------------------------ |
| `bg-white`        | `bg-slate-900` or `bg-slate-800`     |
| `text-gray-900`   | `text-slate-100` or `text-slate-200` |
| `text-gray-600`   | `text-slate-400` or `text-slate-300` |
| `border-gray-300` | `border-slate-700`                   |

---

## Color Strategy: Warm vs Cool Accents

Our color palette balances professional cool tones with warm accents inspired by the WIB logo's rainbow spectrum.

### When to Use Cool Accents (Primary, Secondary, Accent)

**Use for**:

- Primary navigation and links
- Standard buttons and CTAs
- Professional/informational content
- General page accents and highlights
- Regular events and announcements

**Examples**:

- "Learn More" buttons → `bg-primary`
- Navigation links → `text-primary`
- Section headers → `text-accent`

### When to Use Warm Accent (Accent Warm)

**Use for**:

- Featured/special events (like 10th Anniversary)
- High-priority call-to-action buttons
- Important announcements or alerts
- Highlighting diversity and community themes
- Drawing attention to time-sensitive content

**Examples**:

- "Register Now" for featured events → `bg-accent-warm`
- Featured event cards → `border-accent-warm`
- Special announcements → `text-accent-warm`

### Color Harmony Guidelines

The warm accent color system was designed to:

1. **Light Mode** (`#e36d1d` orange): Complement the logo's warm rainbow tones (yellow, orange, coral, pink)
2. **Dark Mode** (`#84cc16` lime green): Provide high contrast and visibility on dark backgrounds
3. Add visual warmth without overwhelming the professional blue/purple foundation
4. Create hierarchy: warm = featured/urgent, cool = standard/professional
5. Align with themes of diversity and community

**Automatic Color Switching**: The `accent-warm` design token automatically switches from orange (light mode) to lime green (dark mode) via CSS custom properties. You don't need to add `dark:` variants manually - just use `bg-accent-warm` and it works!

**Best Practice**: Use warm accent sparingly (10-20% of accent usage) to maintain its special emphasis effect.

---

## Categorical Color vs. Rhythm Color

Color plays two different roles on the site, and picking the wrong one for a given element is a common mistake.

### Categorical color — small, parallel elements

Use a rotating multi-hue palette (blue, green, purple, pink, orange, teal, etc.) when color's job is to let the eye tell several small, same-level items apart, with each item consistently paired to "its" hue.

**Examples**:

- `upskilling.astro` resource cards: each learning category (`bioinformatics`, `biology`, `coding`, `machine-learning`, `math`, `professional-development`) gets its own `border-*-500` / `bg-*-50` pair, applied consistently across every card in that category.
- `survey-results.astro` hero stats: each stat number gets a distinct `text-*-600` hue (`text-blue-600`, `text-pink-600`, `text-green-600`, `text-purple-600`, `text-teal-500`) so the metrics read as separate things at a glance.
- `survey-results.astro` Chart.js dashboard palette (`PALETTE.light` / `PALETTE.dark`) — one hue per data series, for the same reason.

### Rhythm color — large, sequential sections

Use a small, muted, fixed-order rotation (see [Homepage Section Backgrounds](#example-7-homepage-section-backgrounds)) when color's only job is to separate consecutive full-width sections. There's nothing to categorize at this scale, so hue carries no meaning — only "different from the section above/below" matters.

### Which one applies?

- Is this one of several parallel, same-kind items that benefit from being told apart (cards in a grid, stats in a row, series in a chart)? → **categorical color**.
- Is this a large section in a vertical page stack where the only goal is visual separation from its neighbor? → **rhythm color** (muted rotation only — no saturated brand-color fills).

---

## Color Accessibility

When choosing or updating colors, ensure sufficient contrast ratios:

- **Normal text** (body copy): Minimum 4.5:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **UI elements** (buttons, icons): Minimum 3:1 contrast ratio

### Tools for Checking Contrast

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Chrome DevTools (Inspect element → Color picker shows contrast ratio)

---

## Summary

### Key Files

1. **[`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro)** - All CSS custom properties (design tokens)
2. **[`tailwind.config.js`](tailwind.config.js)** - Tailwind color mappings
3. **[`src/styles/global.css`](src/styles/global.css)** - Global CSS classes (`.gold`, `.silver`, etc.)

### Color System Benefits

✅ Single source of truth for all colors
✅ Easy to maintain and update
✅ Consistent across light and dark modes
✅ Type-safe with Tailwind IntelliSense
✅ Semantic naming for better developer experience

### Quick Commands

```bash
# Build the site to verify color changes
npm run build

# Start dev server to preview changes
npm run dev
```

---

**Last Updated**: 2025-10-26
**Maintained By**: Boston Women in Bioinformatics Development Team
