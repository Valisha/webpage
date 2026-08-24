# Boston Women in Bioinformatics - Design System

This document defines the complete design system for the Boston Women in Bioinformatics website, including layout patterns, spacing, components, and usage guidelines.

## Table of Contents

- [Design Tokens](#design-tokens)
- [Layout System](#layout-system)
- [Component Library](#component-library)
- [Spacing Standards](#spacing-standards)
- [Typography](#typography)
- [Buttons](#buttons)
- [Forms](#forms)
- [Best Practices](#best-practices)

---

## Design Tokens

All design tokens are defined in [`src/components/common/CustomStyles.astro`](src/components/common/CustomStyles.astro). For detailed color documentation, see [COLOR_PALETTE.md](COLOR_PALETTE.md).

### Color Strategy

Our color system balances **professional cool tones** (blue, purple) with a **warm accent** that complements the WIB logo's rainbow spectrum:

- **Cool accents** (`primary`, `secondary`, `accent`): Use for standard content, navigation, and professional elements
- **Warm accent** (`accent-warm`): Use sparingly for featured content, high-priority CTAs, and diversity themes
  - **Light mode**: Orange (`#e36d1d`)
  - **Dark mode**: Lime green (`#84cc16`)
  - **Auto-switching**: The design token automatically changes between modes - no need for `dark:` classes!

See [COLOR_PALETTE.md - Color Strategy](COLOR_PALETTE.md#color-strategy-warm-vs-cool-accents) for detailed usage guidelines.

### Quick Token Reference

```css
/* Brand Colors - Light Mode */
--aw-color-primary: rgb(1 97 239); /* Blue - main brand color */
--aw-color-secondary: rgb(1 84 207); /* Dark blue - hover states */
--aw-color-accent: rgb(109 40 217); /* Purple - highlights */
--aw-color-accent-warm: #e36d1d; /* Orange - featured content (auto-switches to lime in dark mode) */

/* Spacing */
--aw-spacing-section-sm: 2rem; /* 32px */
--aw-spacing-section-md: 3rem; /* 48px */
--aw-spacing-section-lg: 5rem; /* 80px */

/* Shadows */
--aw-shadow-card: 0 4px 12px rgba(0, 0, 0, 0.1);
--aw-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.15);

/* Border Radius */
--aw-radius-card: 0.75rem; /* 12px */
--aw-radius-button: 9999px; /* Full round */

/* Borders */
--aw-border-color: #ddd; /* Light gray */
--aw-border-color-accent: #3498db; /* Blue */
```

---

## Layout System

### Container Widths

We use **three standard container widths** across the site:

| Container    | Max Width | Use Case                                     | Tailwind Class |
| ------------ | --------- | -------------------------------------------- | -------------- |
| **Standard** | `1280px`  | Most widgets, sections, main content         | `max-w-7xl`    |
| **Medium**   | `1152px`  | Sponsors, featured content, special sections | `max-w-6xl`    |
| **Narrow**   | `768px`   | Blog posts, articles, form-focused pages     | `max-w-3xl`    |

### Container Usage Rules

✅ **DO**:

- Use `max-w-7xl` for all standard widgets and sections (default in WidgetWrapper)
- Use `max-w-3xl` for blog posts, newsletters, and long-form content
- Use `max-w-6xl` only for special cases (sponsors, wide tables, dashboards)

❌ **DON'T**:

- Use random container widths like `max-w-5xl` or `max-w-4xl`
- Mix container widths within the same page type
- Override container width without documenting the reason

### Layout Examples

```astro
<!-- Standard Widget Container (Most Common) -->
<WidgetWrapper>
  <!-- Content automatically gets max-w-7xl -->
</WidgetWrapper>

<!-- Custom Container Width (Special Case) -->
<WidgetWrapper containerClass="max-w-6xl">
  <!-- Sponsor section needs wider layout -->
</WidgetWrapper>

<!-- Narrow Content (Blog Post) -->
<div class="mx-auto max-w-3xl px-4 md:px-6">
  <article>...</article>
</div>
```

---

## Component Library

### Core UI Components

Located in [`src/components/ui/`](src/components/ui/):

| Component         | Purpose                              | File                                |
| ----------------- | ------------------------------------ | ----------------------------------- |
| **Button**        | All clickable actions                | `Button.astro`                      |
| **Headline**      | Section titles with subtitle/tagline | `Headline.astro`                    |
| **WidgetWrapper** | Wrapper for all widget sections      | `WidgetWrapper.astro`               |
| **Form**          | Form inputs and fields               | `Form.astro`                        |
| **ItemGrid**      | Grid layout for items                | `ItemGrid.astro`, `ItemGrid2.astro` |
| **Background**    | Background patterns/colors           | `Background.astro`                  |

### Widget Components

Located in [`src/components/widgets/`](src/components/widgets/):

- **Hero Variants**: `Hero.astro`, `Hero2.astro`, `HeroText.astro`
- **Features**: `Features.astro`, `Features2.astro`, `Features3.astro`
- **Content**: `Content.astro`, `Steps.astro`, `Steps2.astro`
- **CTAs**: `CallToAction.astro`, `Contact.astro`
- **Data Display**: `Stats.astro`, `Pricing.astro`, `Testimonials.astro`
- **Navigation**: `Header.astro`, `Footer.astro`

---

## Spacing Standards

### Section Padding (Vertical Rhythm)

**Standard Widget Spacing** (defined in `WidgetWrapper.astro`):

```css
py-12          /* 48px top/bottom padding on mobile */
md:py-20       /* 80px top/bottom padding on desktop */
```

**Blog Post Spacing**:

```css
py-8 sm:py-16 lg:py-20    /* Progressive spacing: 32px → 64px → 80px */
```

**Hero Section Spacing**:

```css
py-12 md:py-20 lg:py-0    /* Varies by breakpoint */
```

### Horizontal Padding

**Standard Horizontal Padding**:

```css
px-4           /* 16px on mobile */
md:px-6        /* 24px on tablet/desktop */
```

Always use these values in combination with `mx-auto` for centered containers.

### Component Spacing

**Gap in Grids**:

```css
gap-4          /* 16px - Tight spacing (buttons, small cards) */
gap-6          /* 24px - Normal spacing (features, items) */
gap-8          /* 32px - Wide spacing (large sections) */
gap-x-6        /* 24px horizontal only */
gap-y-8        /* 32px vertical only */
```

**Margins**:

```css
mb-4           /* 16px - Between paragraphs */
mb-6           /* 24px - Between subsections */
mb-8           /* 32px - Between major sections */
mb-12          /* 48px - Between large sections */
```

### Spacing Quick Reference

```astro
<!-- Standard Widget (Use WidgetWrapper) -->
<WidgetWrapper>
  <!-- Auto: py-12 md:py-20, px-4 md:px-6, max-w-7xl, mx-auto -->
</WidgetWrapper>

<!-- Custom Section -->
<section class="py-12 md:py-20">
  <div class="mx-auto max-w-7xl px-4 md:px-6">
    <!-- Content -->
  </div>
</section>

<!-- Item Grid -->
<div class="grid gap-6 md:gap-8">
  <!-- Items -->
</div>
```

---

## Typography

### Font Family

Single font family across all text:

```css
--aw-font-sans: 'Inter Variable';
--aw-font-serif: 'Inter Variable';
--aw-font-heading: 'Inter Variable';
```

All text uses **Inter Variable** font.

### Text Sizes

Use responsive text sizing with Tailwind classes:

| Element             | Mobile | Tablet | Desktop | Classes                                        |
| ------------------- | ------ | ------ | ------- | ---------------------------------------------- |
| **H1 (Hero)**       | 30px   | 36px   | 48px    | `text-3xl sm:text-4xl md:text-5xl`             |
| **H2 (Section)**    | 30px   | 36px   | -       | `text-3xl md:text-4xl`                         |
| **H3 (Card Title)** | 20px   | 24px   | -       | `text-xl md:text-2xl`                          |
| **Body Large**      | 16px   | 18px   | 20px    | `text-base sm:text-lg md:text-xl`              |
| **Body**            | 14px   | 16px   | -       | `text-sm md:text-base`                         |
| **Small**           | 12px   | 14px   | -       | `text-xs md:text-sm`                           |
| **Extra Small**     | 10px   | -      | -       | `text-xxs` (custom, see `tailwind.config.js`)  |
| **Micro**           | 8px    | -      | -       | `text-xxxs` (custom, see `tailwind.config.js`) |

### Font Weights

| Weight       | Value | Tailwind Class  | Use Case              |
| ------------ | ----- | --------------- | --------------------- |
| **Normal**   | 400   | `font-normal`   | Body text, paragraphs |
| **Semibold** | 600   | `font-semibold` | Subheadings, emphasis |
| **Bold**     | 700   | `font-bold`     | Headings, titles      |

### Typography Examples

```astro
<!-- Hero Title -->
<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tighter tracking-tighter">Headline Text</h1>

<!-- Section Title -->
<h2 class="text-3xl md:text-4xl font-bold mb-6">Section Title</h2>

<!-- Body Text -->
<p class="text-base md:text-lg text-default">Body paragraph text</p>

<!-- Muted Text -->
<p class="text-sm text-muted">Secondary information</p>
```

---

## Buttons

### Button Component

**Always use the Button component** from [`src/components/ui/Button.astro`](src/components/ui/Button.astro).

### Button Variants

| Variant       | Appearance                  | Use Case                               |
| ------------- | --------------------------- | -------------------------------------- |
| **primary**   | Blue background, white text | Primary CTAs, main actions             |
| **secondary** | Transparent with border     | Secondary actions, alternative options |
| **tertiary**  | Text only, no border        | Low-priority actions, inline links     |
| **link**      | Styled as link              | Navigation, subtle actions             |

### Button Colors and Customization

The Button component uses the **primary** color by default (`#0161EF` blue). For featured or high-priority CTAs, you can customize the background color:

**Featured/Warm Accent Button**:

```astro
<!-- Automatically orange in light mode, lime green in dark mode -->
<Button
  variant="primary"
  href="/register"
  text="Register Now"
  class="bg-accent-warm hover:bg-red-500 dark:hover:bg-lime-600 text-gray-900 border-accent-warm"
/>
```

**Note**: The `bg-accent-warm` class automatically switches between orange (`#e36d1d`) in light mode and lime green (`#84cc16`) in dark mode. You only need to specify hover states for each mode.

**When to use warm accent buttons**:

- Featured events (e.g., 10th Anniversary)
- High-priority registration CTAs
- Time-sensitive announcements
- Diversity-themed actions

**When to use standard primary buttons**:

- General navigation ("Learn More", "View Events")
- Standard CTAs
- Professional/informational actions

**Podcast/Audio Button (Newsletter Only)**:

Used exclusively for podcast CTAs in newsletter Markdown content, where Tailwind classes are unavailable (the newsletter renders inside a `not-prose` context but inline styles are still required for links). Uses `--aw-color-accent` (`#6d28d9`, deep violet) to visually distinguish podcast links from the standard blue `btn-primary` registration/event buttons.

```html
<a
  href="https://..."
  style="display:inline-block; padding:0.75rem 1.5rem; border-radius:9999px; background-color:#6d28d9; color:#ffffff; font-weight:600; text-decoration:none;"
>
  🎙️ Listen on our Site
</a>
```

**When to use**:

- Podcast episode CTAs inside newsletter `.md` files
- Anywhere a link button must visually signal "audio content" and can't use Tailwind classes

**Color**: `#6d28d9` — same as `--aw-color-accent` / `accent` token. Do not use a different purple shade.

### Button Styles (Defined in tailwind.css)

```css
.btn {
  /* Base: rounded-full, border, py-3.5, px-6 md:px-8 */
}

.btn-primary {
  /* Blue background, white text, hover effect */
}

.btn-secondary {
  /* Same as .btn (border with transparent bg) */
}

.btn-tertiary {
  /* No border, no shadow, text only */
}
```

### Button Usage

```astro
<!-- Primary Button (Link) -->
<Button variant="primary" href="/events" text="View Events" />

<!-- Primary Button (Submit) -->
<Button variant="primary" type="submit" text="Submit Form" />

<!-- Secondary Button -->
<Button variant="secondary" href="/about" text="Learn More" />

<!-- Button with Icon -->
<Button variant="primary" href="/contact" text="Contact Us" icon="tabler:mail" />

<!-- Tertiary Button (Text Link) -->
<Button variant="tertiary" href="/archive" text="View Archive" />
```

### Button Best Practices

✅ **DO**:

- Always use `<Button>` component instead of raw `<button>` or `<a>` tags
- Use `variant="primary"` for main CTAs
- Use `variant="secondary"` for alternative actions
- Provide clear, action-oriented text (e.g., "Register Now", "Learn More")

❌ **DON'T**:

- Create custom button styling with inline classes
- Use hardcoded colors like `text-blue-700 hover:text-white border border-blue-700`
- Nest `<a>` tags inside `<button>` tags
- Use generic text like "Click Here"

---

## Forms

### Form Inputs

Standard form styling from [`src/components/ui/Form.astro`](src/components/ui/Form.astro):

```astro
<input
  type="text"
  class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
  placeholder="Your name"
/>

<textarea
  class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
  rows="4"
  placeholder="Your message"></textarea>
```

### Form Layout

```astro
<form class="space-y-6">
  <!-- Form fields with consistent spacing -->
  <div>
    <label class="block text-sm font-medium mb-2">Name</label>
    <input type="text" ... />
  </div>

  <div>
    <label class="block text-sm font-medium mb-2">Email</label>
    <input type="email" ... />
  </div>

  <Button variant="primary" type="submit" text="Submit" />
</form>
```

---

## Best Practices

### Component Usage

1. **Always use existing components** before creating new ones
2. **Check the component library** in `src/components/ui/` and `src/components/widgets/`
3. **Extend components** via props instead of creating duplicates
4. **Follow the WidgetWrapper pattern** for all section-level components

### Code Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives
│   │   ├── Button.astro
│   │   ├── Headline.astro
│   │   └── WidgetWrapper.astro
│   ├── widgets/         # Full-section components
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── CallToAction.astro
│   └── common/          # Shared utilities (Meta, Analytics, etc.)
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.astro`, `HeroSection.astro`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **CSS Classes**: kebab-case for custom classes, Tailwind utilities as-is
- **Props**: camelCase (e.g., `isDark`, `containerClass`)

### Responsive Design

Use **mobile-first** approach with Tailwind breakpoints:

```css
/* Breakpoints */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Small desktops */
xl: 1280px   /* Large desktops */
2xl: 1536px  /* Extra large screens */
```

**Example**:

```astro
<!-- Mobile: text-sm, Tablet: text-base, Desktop: text-lg -->
<p class="text-sm md:text-base lg:text-lg">Responsive text</p>

<!-- Mobile: column, Desktop: 2 columns -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">...</div>
```

### Dark Mode

Follow the dark mode guidelines from [COLOR_PALETTE.md](COLOR_PALETTE.md):

- Use `dark:` variant for all color changes
- Standardize on **slate** colors (not gray) for dark mode
- Test all components in both light and dark modes

```astro
<!-- Correct -->
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">Content</div>

<!-- Incorrect -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">Content</div>
```

---

## Checklist for New Components

When creating or updating components, ensure:

- [ ] Uses design tokens from `CustomStyles.astro`
- [ ] Uses Tailwind utility classes (no inline styles)
- [ ] Follows spacing standards (`py-12 md:py-20`, `px-4 md:px-6`)
- [ ] Uses correct container width (`max-w-7xl`, `max-w-6xl`, or `max-w-3xl`)
- [ ] Includes dark mode support (`dark:` variants)
- [ ] Uses Button component for all CTAs
- [ ] Responsive on all breakpoints (mobile-first)
- [ ] Tested in light and dark modes
- [ ] Follows accessibility standards (ARIA labels, semantic HTML)

---

## Common Patterns

### Widget Pattern (Recommended)

```astro
---
import WidgetWrapper from '~/components/ui/WidgetWrapper.astro';
import Headline from '~/components/ui/Headline.astro';
import Button from '~/components/ui/Button.astro';
---

<WidgetWrapper id="my-section">
  <Headline title="Section Title" subtitle="Optional subtitle" tagline="Optional tagline" />

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Content -->
  </div>

  <div class="mt-8 text-center">
    <Button variant="primary" href="/learn-more" text="Learn More" />
  </div>
</WidgetWrapper>
```

### Card Pattern

```astro
<div class="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-slate-700">
  <h3 class="text-xl font-bold mb-4">Card Title</h3>
  <p class="text-muted mb-6">Card description...</p>
  <Button variant="secondary" href="/details" text="Read More" />
</div>
```

### Event List Pattern

```astro
<div class="grid grid-cols-1 gap-6">
  {
    events.map((event) => (
      <div class="bg-gray-90 dark:bg-slate-700 rounded-lg shadow-md flex p-4">
        <img src={event.image} class="h-48 w-48 rounded-md" />
        <div class="flex-1 pl-6">
          <h3 class="text-xl font-semibold mb-2">{event.title}</h3>
          <p class="text-sm text-muted mb-4">{event.date}</p>
          <Button variant="primary" href={`/events/${event.id}`} text="MORE INFO" />
        </div>
      </div>
    ))
  }
</div>
```

### Featured Event Pattern (with Warm Accent)

```astro
<!-- Featured event with warm accent for emphasis --><!-- Note: bg-accent-warm automatically becomes lime green in dark mode -->
<div class="border-l-4 border-accent-warm bg-orange-50 dark:bg-slate-800 rounded-lg shadow-lg p-6">
  <div class="flex items-start gap-2 mb-2">
    <span class="bg-accent-warm text-gray-900 text-xs font-bold px-2 py-1 rounded">FEATURED</span>
    <h3 class="text-2xl font-bold text-accent-warm">10th Year Anniversary Celebration</h3>
  </div>
  <p class="text-muted mb-4">September 30th at Boynton Yards</p>
  <p class="mb-6">Join us for a special evening celebrating a decade of WIB...</p>
  <Button
    variant="primary"
    href="/events/anniversary"
    text="Register Now"
    class="bg-accent-warm hover:bg-red-500 dark:hover:bg-lime-600 text-gray-900 border-accent-warm"
  />
</div>

<!-- Standard event with cool accent -->
<div class="border-l-4 border-accent bg-purple-50 dark:bg-slate-800 rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold text-accent">Monthly Networking Event</h3>
  <p class="text-muted mb-4">October 15th at Cambridge Innovation Center</p>
  <p class="mb-6">Our regular monthly gathering for networking and discussion...</p>
  <Button variant="primary" href="/events/monthly" text="Learn More" />
</div>
```

---

## Updating the Design System

When making changes to the design system:

1. **Update tokens** in `src/components/common/CustomStyles.astro`
2. **Update documentation** in this file and `COLOR_PALETTE.md`
3. **Test across the site** to ensure consistency
4. **Build the site** to verify no errors: `npm run build`
5. **Commit with descriptive message** explaining the change

---

## Resources

- **Color System**: [COLOR_PALETTE.md](COLOR_PALETTE.md)
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Astro Docs**: https://docs.astro.build
- **Inter Font**: https://rsms.me/inter/

---

**Last Updated**: 2025-10-26
**Maintained By**: Boston Women in Bioinformatics Development Team
