# Component Organization

Components are grouped by **content-type** where the domain is specific to one part of the site, and by **role** where a component is generic infrastructure or UI. There is no root-level catch-all — every file lives in one of the folders below.

| Folder        | Grouping             | Contains                                                                                                                             | Example                                                                                                   |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `blog/`       | Content-type         | Blog post infrastructure and embeddable content                                                                                      | `SinglePost.astro`, `Pagination.astro`, `Quiz.astro`                                                      |
| `events/`     | Content-type         | Event page infrastructure                                                                                                            | `EventsTable.astro`, `Signup.astro`, `FormattedDate.astro`                                                |
| `newsletter/` | Content-type         | Newsletter issue rendering                                                                                                           | `SinglePost.astro`, `NewsletterSignup.astro`                                                              |
| `common/`     | Role — site infra    | Cross-cutting infrastructure imported by layouts, not tied to any one content type                                                   | `Metadata.astro`, `Analytics.astro`, `Banner.astro`, `Logo.astro`, `Favicons.astro`, `CustomStyles.astro` |
| `ui/`         | Role — primitives    | Small, reusable building blocks with no page-level opinion                                                                           | `Button.astro`, `Card.astro`, `Headline.astro`                                                            |
| `widgets/`    | Role — page sections | Larger sections composed together to build a page (mostly landing-page style content); `widgets/forms/` groups form-specific widgets | `Hero.astro`, `Features.astro`, `Pricing.astro`, `Sponsors.astro`                                         |

## Deciding where a new component goes

1. **Is it only meaningful for one content type** (blog posts, events, or newsletters)? Put it in that folder, even if — like `blog/Quiz.astro` — it's embedded content rather than page-template infrastructure.
2. **Otherwise, is it a small, generic, opinion-free building block** reused across many contexts? → `ui/`.
3. **Is it a self-contained page section** meant to be composed into a page (a hero, a pricing table, a stats block)? → `widgets/` (or `widgets/forms/` if it's a form).
4. **Is it site-wide infrastructure** imported by a layout rather than a page (metadata/SEO, analytics, the header logo, favicons, design tokens)? → `common/`.

Keep this file in sync with the Components section of `AGENTS.md` when the folder structure changes (see Local Norm 1).
