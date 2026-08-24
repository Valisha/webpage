# AGENTS.md

Guidance for AI agents working in this repository.

---

## Codebase Map

### Tech Stack

- **Framework**: Astro 7.x (static output) + TypeScript (strict)
- **Styling**: Tailwind CSS 3 via a plain `postcss.config.cjs` (class-based dark mode, custom theme vars) — no `@astrojs/tailwind` integration
- **Interactive components**: React 19 (`.tsx` files)
- **Content**: Astro Content Collections (Content Layer API — every collection uses an explicit `loader: glob(...)`) with Zod schemas (MDX + Markdown)
- **Path alias**: `~` → `src/` (configured in `tsconfig.json` and `vite`)

### Top-Level `src/` Layout

```
src/
├── assets/          # Static images imported by components (e.g. newsletter_header.png)
├── components/      # UI building blocks (see below)
├── content/         # Content collections — Markdown/MDX files
├── layouts/         # Page wrapper layouts
├── pages/           # File-based routes (Astro pages)
├── styles/          # Global CSS
├── utils/           # Pure TypeScript helpers
├── vendor/          # Vendored src-level packages (e.g. seo/) — see dependency-upgrades skill
├── config.yaml      # Site-wide config (name, URL, blog/newsletter settings)
├── content.config.ts # Content Collections schema/loader definitions
├── navigation.ts    # Header/footer nav structure — edit this to add/remove nav links
├── types.d.ts       # Shared TypeScript types (Post, Newsletter, Taxonomy, MetaData…)
└── env.d.ts         # Astro env types
```

Root-level `vendor/` (outside `src/`) holds build-time Astro integrations (e.g. `vendor/integration`); `src/vendor/` is for runtime components imported via the normal `~/*` alias (e.g. `~/vendor/seo`).

### Entry Points

| File                                             | Role                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `src/pages/index.astro`                          | Homepage                                                                        |
| `src/pages/[...blog]/[...page].astro`            | Blog list with search + category cards                                          |
| `src/pages/[...blog]/index.astro`                | Individual blog post                                                            |
| `src/pages/[...blog]/[category]/[...page].astro` | Category page (search + sort + series filter)                                   |
| `src/pages/[...blog]/[series]/[...page].astro`   | Series page (sort, back link varies by category)                                |
| `src/pages/[...blog]/[tag]/[...page].astro`      | Tag page                                                                        |
| `src/pages/newsletter/[...page].astro`           | Newsletter list                                                                 |
| `src/pages/newsletter/[...slug].astro`           | Individual newsletter issue                                                     |
| `src/pages/events/index.astro`                   | Events listing (past events section hidden when upcoming events exist)          |
| `src/pages/events/archive/index.astro`           | Past events archive (client-side search, sort, date range, hide-partner filter) |

### Content Collections (`src/content.config.ts`)

Every collection uses the Content Layer API (`loader: glob(...)`) — see the dependency-upgrades skill for the `id`/`render()` migration pattern this implies for `CollectionEntry` consumers.

| Collection   | Description        | Key Fields                                                                                                                                                                                                                 |
| ------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `post`       | Blog posts         | `publishDate`, `updateDate`, `category`, `series`, `tags`, `authors`, `draft`, `hiddenFromFeed`, `hideHeroImage`, `imageAlt`, `imageDescription`, `imagePosition`, `url`, `listeningTime`                                  |
| `newsletter` | Newsletter issues  | `publishDate`, `issue`, `title`, `authors`, `imageAlt`, `imageDescription`, `imagePosition` — loader accepts `.md` **and** `.mdx` (issues 008+ are `.mdx`, to embed the `<ExecutiveBoard />` component; see Local Norm 23) |
| `event`      | Events             | `title`, `dateTime`, `endDate`, `location`, `tags`, `image`, `imgpos`, `partnerEvent`, `partnerOrganization` — **files live in `src/content/meetups/`** (folder name differs from collection name)                         |
| `committees` | Committee pages    | `title`, `chairs`, `members`                                                                                                                                                                                               |
| `resources`  | Resource directory | `category`, `tags`, `featured`                                                                                                                                                                                             |
| `series`     | Series metadata    | `title`, `description`, `image`, `imageAlt`, `imageFit`                                                                                                                                                                    |

### Key Utility Files (`src/utils/`)

| File             | Role                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blog.ts`        | All static path generators (`getStaticPathsBlogListAll`, `getStaticPathsBlogCategory`, `getStaticPathsBlogSeries`, `getStaticPathsBlogPost`, etc.), post normalization, series metadata, filtering |
| `permalinks.ts`  | URL generation — `getPermalink(slug, type)` where `type` is `'post' \| 'category' \| 'tag' \| 'series'`; also exports `BLOG_BASE`, `CATEGORY_BASE`, `TAG_BASE`, `SERIES_BASE`                      |
| `images.ts`      | Image lookup (`findImage`) and `adaptOpenGraphImages` — public paths (`/team/`, `/photos/`, `/blog_images/`, `/sponsors/`) are returned as-is with default OG dimensions, bypassing optimization   |
| `utils.ts`       | Formatting helpers (`getFormattedDate`, etc.)                                                                                                                                                      |
| `newsletter.ts`  | Newsletter-specific fetch helpers                                                                                                                                                                  |
| `frontmatter.ts` | Remark plugins: reading time, responsive tables, lazy images                                                                                                                                       |

### Components

```
src/components/
├── blog/          # Blog-specific: SinglePost, RelatedPosts, ToBlogLink, Pagination, Tags, Quiz, ImessageChat
├── events/        # Event-specific: EventsTable, FormattedDate, EventAddress, Signup, AddToCalendarButton
├── ui/            # Primitives: Headline, PostListItem, PostList, PostGridItem, Button, Card, NewBadge…
├── widgets/       # Page sections: Hero, Features, BlogLatestPosts, UpcomingEvents, Contact, Sponsors…
├── common/        # Infra: Metadata, Analytics, ToggleTheme, Image, SocialShare, Banner, Logo, Favicons, CustomStyles
└── newsletter/    # SinglePost.astro (renders newsletter issue HTML), ExecutiveBoard.astro (live board grid)
```

Every component lives in a folder grouped by content-type (`blog/`, `events/`, `newsletter/`) or role (`ui/` primitives, `widgets/` page sections, `common/` site infra). See `src/components/README.md` for the full organization rationale; keep it in sync with this table (Local Norm 1).

**Event-specific components (`src/components/events/`):**

- `widgets/UpcomingEvents.astro` — shows the **single next upcoming event** in a hero layout; used on the homepage. Has two buttons: "Learn More" (`btn-primary`) and "Browse Events" (`btn-secondary`), wrapped in a flex container.
- `events/EventsTable.astro` — shows **all upcoming events** as cards on the `/events` page; past events section only renders when there are no upcoming events
- `events/FormattedDate.astro` — renders event dates in New York time. `isMultiDay` compares dates using `toNYDateString` (NY timezone) to avoid UTC boundary bugs. All three branches (multi-day, same-day-with-end, single) append the timezone abbreviation (EDT/EST).
- `events/Signup.astro` — renders the registration button on event pages. Accepts `url`, `data_luma_event_id`, and `slug` props. Automatically appends `utm_source=boston-wib&utm_medium=event-page&utm_campaign=<slug>` to the registration URL — **do not manually add UTM params to the `url` field in event frontmatter**. The slug is passed from `[...slug].astro` as `meeting.data.slug ?? meeting.id`.

**`blog/ImessageChat.astro`** — animated, looping iMessage-style Q&A chat embedded in a blog post (terminal-style title type-in, then a phone frame that plays a rapid-fire back-and-forth). Generalized so it isn't tied to one interview: props are `terminalCommand`/`terminalTitle` (the typing animation text), `asker`/`responder` (`{ name, photo }`, right/blue vs. left/gray bubble), and `conversationYaml` — a raw YAML string. Usage lives in an `.mdx` post (plain `.md` can't embed components — same constraint as newsletter `<ExecutiveBoard />`, Local Norm 23): the conversation turns live in a sibling `*-conversation.yaml` file next to the post (e.g. `20260821_post_Isha-conversation.yaml`, an array of `{ q, a }` entries), imported with `import conversationYaml from './xxx-conversation.yaml?raw'` and passed straight through as the prop — the component parses it at build time with `js-yaml` (there's no Vite YAML-import plugin registered, so `?raw` + `js-yaml` is the established way to consume a sibling YAML data file; `vendor/integration/utils/loadConfig.ts` uses the same `fs.readFileSync` + `yaml.load` pair for `src/config.yaml`). The chat rows/bubbles/avatars are created client-side via `document.createElement`/`innerHTML`, so the component's CSS must be `<style is:global>` (same reason as `survey-results.astro`'s JS bar-list, see below) — all classes are `ichat-`-prefixed to avoid colliding with page CSS, and a random `instanceId` namespaces the DOM ids so more than one instance could coexist on a page.

**`common/Banner.astro`** — generic dismissable announcement banner, not hardcoded to one message. Props: `id` (unique per instance — required whenever more than one `<Banner>` renders on the same page, since dismissal state is stored in `localStorage` under `bannerDismissed:<id>`), `bgClass`, `textClass` (message text color — must be paired with `bgClass` for contrast; the default `text-accent dark:text-white` only works on the default violet `bgClass`), `showBlobs` (toggles the decorative blurred gradient blobs), `linkHref`/`linkText`/`linkClass`/`arrowClass` for an optional CTA (`arrowClass` must be updated too if `linkClass` uses different colors — it doesn't inherit link text color, to stay legible regardless of ancestor styling), and default-slot content for the message body. The dismiss script (`initBanner`) iterates every `[data-banner]` element on the page independently via `data-banner-id`, so multiple banners with different `id`s can coexist without colliding. `PageLayout.astro`'s sitewide `<Banner />` usage is currently commented out; `survey-results.astro` renders its own `<Banner id="survey-fact-banner">` directly in the page body using all defaults (violet/purple), so it only appears on that one page.

### Survey Results Page (`src/pages/resources/survey-results.astro`)

A Chart.js-based interactive dashboard showing aggregate survey results for bioinformaticians in the US. Key details:

- Gated behind an honor-system lock: visitors must submit the Google Form (or click "I've already submitted") to unlock. Gate state stored in `localStorage` under key `wib_survey_unlocked`. Unlocked via `?unlocked=true` URL param (set in Google Form confirmation message).
- All chart data is aggregate only — no individual records, no cross-tabulations, no PII. Small cells (n<3) are merged into "Other" categories.
- Chart.js loaded via CDN (`cdn.jsdelivr.net`). All chart initialization in `<script is:inline>`.
- Uses `<style is:global>` only for the hero dot-pattern background (`.survey-hero-bg`) and the dynamically-created JS bar-list layout (`.s-bl-label`, `.s-bar-track`, `.s-bar-fill`) — text sizing on those JS-created elements is done via Tailwind classes in the `className` string, not custom CSS (Local Norm 5).
- WIB logo is the `src/assets/images/WIB_Logo.jpg` asset, imported and rendered via `common/Image.astro` (not a `public/` path).
- The "Fact Banner" callout uses `common/Banner.astro` with its default styling (see above) rather than hand-rolled markup.
- Hero Stats section coloring matches `src/pages/resources/upskilling.astro`'s neutral gray palette (`bg-white dark:bg-gray-800`, `border-gray-200 dark:border-gray-700`) for card structure, but the "Boston Women in Bioinformatics" badge is pastel blue (`bg-blue-50 dark:bg-blue-900/30`, `text-primary dark:text-blue-200`), not gray — avoid plain gray/monochrome fills on this page in favor of a pastel tint of an existing token. Each stat number uses one of `upskilling.astro`'s category accent colors (`text-blue-600`, `text-pink-600`, `text-green-600`, `text-purple-600`, `text-teal-500`, each with a `dark:` variant) instead of all sharing `text-accent-warm`. The two "Take the Survey" buttons match the Fact Banner's button colors (`bg-accent`/`dark:bg-white`) rather than `bg-accent-warm`.
- The repeated "key insight" callout boxes use `border-primary bg-blue-50 dark:bg-slate-800` (cool tone), not `border-accent-warm bg-orange-50` — `accent-warm` orange is intentionally reserved for exactly one spot in the whole dashboard (the "Job Seeking" chart segment), per COLOR_PALETTE.md's "use warm accent sparingly" guidance. Don't reintroduce orange elsewhere without a specific reason.
- Chart.js colors come from a theme-aware `PALETTE.light`/`PALETTE.dark` object (pastel tints in light mode, saturated brand colors in dark mode — pastels wash out on a dark background), selected once at page load via `isDarkMode` into a `C`/destructured set of constants (`WARM`, `BLUE`, `SECONDARY`, `PURPLE`, `PINK`, `GOLD`, `TEAL`, `INDIGO`, `SUCCESS`, `WARNING`, `ERROR`, `INFO`). There is no achromatic/gray filler color — `TEAL`/`INDIGO` fill the "residual" (Other/No/Outside US) chart slots that would conventionally default to gray, so every segment reads as an actual pastel hue. Add new colors to both palette halves as real hues, never a gray/monochrome value.
- `Chart.defaults.color` and `gridColor` are set explicitly (Chart.js's own default is too low-contrast in both themes) and kept in sync live via a `MutationObserver` on `<html class>` plus a `resize` listener, both of which call `.update()` on every chart tracked in `allCharts`.
- All small/xs text within `#survey-dashboard` (tab nav, card titles, "n = " captions, insight-box text) — plus the JS-created bar-list rows and the Chart.js legend/axis text via `chartFontSize()` — use the same responsive scale: `text-sm lg:text-base xl:text-lg` (14/16/18px). Keep any new dashboard text on this same scale rather than introducing another one-off size.
- Dark-mode secondary/muted text across the whole page (page header, hero stats, gate overlay, dashboard cards, tab nav, footer) is `dark:text-slate-200` — matching `Chart.defaults.color`'s dark value (`#e2e8f0`) exactly, so HTML text and canvas-rendered legend text have identical contrast. Don't introduce `dark:text-slate-300/400/500` for new muted text on this page; use `dark:text-slate-200`. (`dark:text-slate-100` for headings and the inverted `dark:text-slate-900` button-on-white-pill case are unaffected — this convention is specifically for de-emphasized/secondary text.)
- Donut/pie legends use `position: 'bottom'`, not `'right'` — a side legend truncates long labels in a narrow card; a bottom legend wraps across the chart's full width instead. Chart `DATA` labels must be plain full names (no abbreviations, no embedded `\n` — canvas legend text doesn't render line breaks).
- Added to nav under Resources in `src/navigation.ts`.

### Navigation (`src/navigation.ts`)

`headerData.links` drives the top nav. Each item is either a flat link `{ text, href }` or a dropdown `{ text, href, links: [...] }`. The current top-level items are: **Home, Who we are, Resources, Newsletter, Team, Events, Media, Contact, Donate**. The **Events** dropdown currently contains: Upcoming Events, Fall Fundraiser 2026, Past Events Archive, Recorded Events. To add a link (e.g. Past Events Archive), add an entry to the relevant `links` array using `getPermalink('/events/archive')`.

### Layouts (`src/layouts/`)

`Layout.astro` → `PageLayout.astro` (most pages), `MarkdownLayout.astro` (blog posts), `EventLayout.astro`, `LandingLayout.astro`

### Configuration Files

| File                   | Role                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/config.yaml`      | Blog/newsletter settings (posts per page, permalink patterns, paths)                                                                                                                                  |
| `src/config/social.ts` | Central social/community URL constants: `SLACK_INVITE_URL`, `LINKEDIN_URL`, `BLUESKY_URL`, `YOUTUBE_URL`, `GITHUB_URL`, `TWITTER_URL`, `LUMA_URL`, `GIVEBUTTER_URL` — update here when links change   |
| `astro.config.ts`      | Integrations (Sitemap, MDX, Icons, React, Partytown, astro-compress), image domains — Tailwind's global stylesheet is precompiled by the `build:css` script (Local Norm 22), not processed by Vite    |
| `postcss.config.cjs`   | Registers `tailwindcss` + `autoprefixer` as PostCSS plugins for component-scoped `<style>` blocks only (replaces the deprecated `@astrojs/tailwind` integration; see Local Norm 17 and Local Norm 22) |
| `tailwind.config.js`   | Custom colors (`primary`, `secondary`, `accent`, social colors), fonts (`font-heading`), `intersect` variant                                                                                          |
| `.prettierrc.cjs`      | Print width 120, single quotes, `prettier-plugin-astro`                                                                                                                                               |
| `eslint.config.js`     | ESLint 9 flat config — Astro + TypeScript recommended                                                                                                                                                 |

### Design Documentation

| File               | Role                                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `COLOR_PALETTE.md` | Full color system reference — design tokens, Tailwind utility classes, usage examples, dark mode behavior                               |
| `DESIGN_SYSTEM.md` | Layout patterns, spacing scale, component library, typography, buttons, forms — cross-references `COLOR_PALETTE.md` for color specifics |

Both derive from the design tokens in `src/components/common/CustomStyles.astro` and the color/font values in `tailwind.config.js` — see Local Norm 21 to keep them in sync.

### CI/CD (`.github/workflows/`)

- **`actions.yaml`**: Runs on PRs and pushes to `main` — matrix build (Node 18/20/22) + ESLint + Prettier check
- **`daily-build.yml`**: Runs daily at 6 AM UTC, but only triggers the actual Netlify build hook when `scripts/needs-daily-build.mjs` reports a post or newsletter issue publishing today, or an event moving into the past/archive split today — this avoids burning Netlify build minutes on days with no date-boundary changes. Always builds on a manual `workflow_dispatch` run regardless of the check.
- The site is hosted on **Netlify**, which builds and deploys automatically on push to `main`. There is no GitHub Pages deployment.

### Tests

No test suite (no Jest/Vitest/Playwright config). Quality is enforced via `astro check` (TypeScript) + ESLint + Prettier in CI.

---

## Naming Conventions

- **Pages with dynamic routes**: bracket notation, e.g. `[category]`, `[...page]`, `[series]`
- **Static path generators**: `getStaticPathsBlog*` (exported from `src/utils/blog.ts`)
- **Content files**: kebab-case filenames under `src/content/<collection>/`
- **Series slugs**: match the series frontmatter title converted to kebab-case (used in `getPermalink(slug, 'series')`)
- **Categories excluded from the main blog feed**: listed in `BLOG_EXCLUDED_CATEGORIES` in `blog.ts` (currently `['Podcast', 'Video']`). These categories are excluded from the paginated blog list but are surfaced on the homepage separately — Podcast gets its own "Latest Podcast" card, Video appears in the "Recent Media" grid alongside regular blog posts.
- **`Interview` category**: active category with its own category card on `/blog`. Card uses LinkedIn blue (`#0077b5`). Do not mark it `comingSoon`.
- **`hiddenFromFeed`**: posts that exist but should not appear in list pages (e.g. short Tuesday Tactics entries — shown only via their series card)

---

## Local Norms

1. **Update `AGENTS.md` after every file added or updated** — after adding or modifying any component, utility, script, content collection field, naming convention, or local norm, update the relevant section of this file before closing the task. Do not batch updates — write them as the changes are made. If a new frontmatter field is added or changed, also update `README.md` (see norm 1a below).
   1a. **Update `README.md` when frontmatter changes** — whenever a frontmatter field is added, removed, or its behavior changes for any content collection (`post`, `newsletter`, `event`, `series`, `committees`, `resources`), update the corresponding section under "Manual Instructions" in `README.md` to reflect the change.
   1b. **Keep `.claude/commands/` and `.claude/skills/` references in sync** — whenever a command or skill file is added, renamed, removed, or moved between `.claude/commands/` (scaffolding) and `.claude/skills/` (content-writing/auto-triggered), update this file's Contextual Skills table and `README.md`'s "Available Commands" table / "Skills that trigger automatically" list so both stay pointed at the right files.
2. **No auto-commit** — never commit unless the user explicitly asks.
3. **No force-push** — always create new commits rather than amending, especially after hook failures.
4. **`prettier` enforced** — run `npm run fix` (eslint + prettier) before committing; CI will fail otherwise.
5. **Tailwind only** — style with Tailwind classes. Avoid arbitrary CSS except for dark-mode overrides on inline-styled HTML in Markdown content (use `<style>` with `:global(.dark) ...`).
6. **`getPermalink` for all URLs** — never hardcode `/blog/...` URLs; use `getPermalink(slug, type)` from `~/utils/permalinks`.
   5a. **Public image paths in components** — `isRemoteImage` checks in `SinglePost.astro`, `PostGridItem.astro`, and `PostListItem.astro` must include `/team/` and `/photos/` so they render as plain `<img>` tags. `common/Image.astro` also bypasses `astroAsseetsOptimizer` for these paths. When adding a new `public/` subdirectory used as a blog image source, add it to all four places.
7. **Props flow through static path generators** — to pass new data to a page, add it to the `props` object in the relevant `getStaticPaths*` function in `src/utils/blog.ts`.
8. **Series back links are category-aware** — the series page reads `categorySlug` from props and renders "All Podcasts", "All Videos", or "All Categories" accordingly.
9. **Dark mode** — Tailwind `dark:` variants throughout. For inline-styled HTML in Markdown (e.g. newsletter tables), use a scoped `<style>` block with `:global(.dark) element[style*="..."] { ... !important }`.
10. **`BLOG_EXCLUDED_CATEGORIES`** — Podcast and Video posts are excluded from the main blog list and category filter but appear on their own category pages at `/blog/podcast` and `/blog/video`. On the homepage, the latest Podcast is shown in its own card (top row, right column) and Video posts appear in the "Recent Media" grid. The homepage fetches via `findLatestPosts({ count: 20 })` and splits by `category.slug`.
11. **Search data attributes** — client-side search uses `data-search` on `<li>` elements; sort uses `data-date` (milliseconds); series filter uses `data-in-series` and `data-series-card`.
12. **Archive `DEFAULT_START`** — `src/pages/events/archive/index.astro` has a hardcoded `DEFAULT_START = '2025-08-08'` used as the default "From" date. Update this when the desired default window changes. The date picker `min="2024-08-08"` is the first-ever event date and should stay fixed.
13. **Committee chair validation** — `scripts/check-committee-chairs.mjs` cross-checks that every chair in `src/content/committees/*.md` has a matching "Chair" title in `src/config/components/team.js`, and vice versa. Run with `npm run check:committees`. Committees with `hidden: true` are skipped. The script normalizes hyphens, spaces, and `&`/`and` for matching. Run this script after editing either file.
14. **Team member title line breaks** — in `src/config/components/team.js`, use `&` as the separator between multiple roles for a single person. `Team.astro` splits on `&` and renders each part on its own line. Example: `'Treasurer & Finance Committee Chair & Events Committee Co-chair'`.
15. **Newsletter issue validation** — `src/utils/newsletter.ts` throws a build error at load time if two newsletters share the same `issue` number. The `issue` field must be set manually in each newsletter's frontmatter.
16. **Member Spotlight post titles** — use `'Member Spotlight: First\u00a0Last'` (Unicode non-breaking space U+00A0 between first and last name) so the name never wraps mid-name. `SinglePost.astro` detects the `Member Spotlight:` prefix and renders "Member Spotlight:" at smaller size (`!text-2xl`) on its own line above the name.
17. **No `@astrojs/tailwind` or `@astrolib/*` packages** — they cap the installable `astro` version and block security patches. See the dependency-upgrades skill before adding any astro-ecosystem package back or running a major `astro` upgrade.
18. **Content Collections use the Content Layer API** — every collection has an explicit `loader: glob(...)` in `src/content.config.ts`; entries use `id`/`render(entry)`, not `slug`/`.render()`. See the dependency-upgrades skill for the migration pattern.
19. **`define:vars` inline scripts can't use a bare top-level `return`** — wrap the script body in an IIFE if early-return logic is needed (see `src/components/common/BasicScripts.astro`).
20. **Path aliases must not collide** — any new alias added to `tsconfig.json` `paths` or `vite.resolve.alias` in `astro.config.ts` must not share a prefix with an existing alias (e.g. don't add `~vendor` alongside `~`). Reuse `~/*` for anything importable from `src/`, including `src/vendor/`.
21. **Keep `COLOR_PALETTE.md` and `DESIGN_SYSTEM.md` in sync** — whenever a design token, brand/social color, spacing value, or reusable component pattern changes (in `src/components/common/CustomStyles.astro`, `tailwind.config.js`, or a shared UI component), update the corresponding section in both docs. `DESIGN_SYSTEM.md` links out to `COLOR_PALETTE.md` for color detail — don't duplicate color specifics into `DESIGN_SYSTEM.md`, keep that split.
22. **Global Tailwind CSS is precompiled, not Vite-bundled** — as of the `astro@7`/`vite@8` pairing, Vite's build (Rolldown-based) silently drops every responsive (`sm:`/`md:`/`lg:`/`xl:`) `@media` rule when `src/assets/styles/tailwind.css` is bundled via a normal JS `import` (confirmed by direct PostCSS instrumentation: Tailwind/PostCSS itself generates the correct output; Vite's bundling step discards it). Workaround: the `build:css` npm script runs the `tailwindcss` CLI directly (`tailwindcss -i ./src/assets/styles/tailwind.css -o ./public/tailwind-built.css --minify`), and `Layout.astro` loads the result via a plain `<link rel="stylesheet" href="/tailwind-built.css" />` instead of importing the source file — this bypasses Vite's CSS pipeline entirely for the global stylesheet. `predev`/`prebuild` scripts run `build:css` automatically. `public/tailwind-built.css` is gitignored (generated). Component-scoped `<style>` blocks are unaffected (still Vite/PostCSS-processed normally) since they're small and don't hit this bug. If a future `astro`/`vite` upgrade fixes the underlying Rolldown CSS bug, this workaround can likely be reverted to a plain `import '~/assets/styles/tailwind.css';` in `Layout.astro` — verify with `grep -c "@media" dist/_astro/*.css` on a clean build first.
23. **Newsletter Executive Board renders live, then freezes to a per-issue snapshot at publish time** — `src/components/newsletter/ExecutiveBoard.astro` renders a photo grid from an optional `members` prop, defaulting to the `exec` named export from `src/config/components/team.js` when the prop isn't passed. While an issue is a draft, use the bare `<ExecutiveBoard />` so it tracks board changes live with zero manual maintenance. Right before an issue is finalized for publication, `edit-newsletter`'s Step 4 snapshots the current board into a sibling JSON file (`issue-{NNN}-execboard.json`) and switches the issue to `<ExecutiveBoard members={execBoardSnapshot} />`, so the published issue is a historical record of who was on the board at send time. Newsletter issues that use this component must be `.mdx` (the newsletter collection's loader in `content.config.ts` accepts `**/*.{md,mdx}`, mirroring `post`) since plain `.md` can't embed components or import JSON as a component prop — see the `add-newsletter` command and `edit-newsletter` skill for the exact usage pattern. Issues 001–007 predate this and remain `.md` with the old static image; don't migrate them unless asked. The photo grid is `grid-cols-3 sm:grid-cols-4 md:grid-cols-5` — long single-word titles (e.g. "Communications") can wrap awkwardly if a column gets too narrow, so widen at a higher breakpoint rather than adding more columns at a low one before checking the rendered column width against the `max-w-4xl` content column in `MarkdownLayout.astro`. `tailwind.config.js`'s `theme.extend.fontSize` also defines `text-xxs` (10px) and `text-xxxs` (8px) (documented in `DESIGN_SYSTEM.md`'s Text Sizes table per Local Norm 21), but nothing in the codebase currently uses them.
24. **Homepage sections cycle through 3 background colors** — `src/pages/index.astro`'s top-level `<section>` blocks rotate through `bg-white dark:bg-dark` → `bg-gray-50 dark:bg-slate-800` → `bg-blue-50 dark:bg-blue-950`, in that order, as a plain rhythm to separate blocks. When adding, removing, or reordering a homepage section, keep the rotation continuous (pick up the next color in sequence rather than repeating the color of the section directly above it).
25. **Daily build is gated, not unconditional** — `daily-build.yml` runs on a daily cron, but `scripts/needs-daily-build.mjs` decides whether to actually call the Netlify build hook. It compares plain `YYYY-MM-DD` calendar dates (extracted directly from frontmatter strings, in America/New_York) rather than fully parsing timezone-aware `Date` objects — this is a cheap "should we bother" gate, not the site's real event/post date logic (that lives in `EventsTable.astro` / `archive/index.astro`, which use `endDate ?? dateTime` compared against `now` in NY time). It flags a build as needed when any of: a non-draft post's `publishDate` is today, a non-draft newsletter issue's `publishDate` is today, or an event's `endDate` (falling back to `dateTime`) was yesterday (crossing into the past/archive split). `workflow_dispatch` (manual trigger) always builds regardless of the check. If a new content collection is added whose visibility depends on today's date, extend this script's checks to cover it.

---

## Contextual Skills

When the user's request involves any of the topics below, read the corresponding skill file before responding. Each file contains required field definitions, formatting conventions, and step-by-step instructions that must be followed exactly.

Commands (`.claude/commands/*.md`) scaffold new files/frontmatter — invoke with `/name` or by topic. Skills (`.claude/skills/<name>/SKILL.md`) cover writing/revising body content and auto-trigger by description; use them once the file already exists.

| Topic                        | Trigger keywords                                                                              | Location                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Newsletter (new issue)       | new newsletter, newsletter outline, newsletter issue number                                   | `.claude/commands/add-newsletter.md`           |
| Newsletter (content/publish) | edit newsletter, newsletter content, TOC, UTM, newsletter buttons                             | `.claude/skills/edit-newsletter/SKILL.md`      |
| Blog post (new)              | blog post, write a post                                                                       | `.claude/commands/add-blog-post.md`            |
| Blog post (content/format)   | edit blog post, member spotlight, podcast embed, blog formatting                              | `.claude/skills/edit-blog-post/SKILL.md`       |
| Blog series                  | blog series, add series                                                                       | `.claude/commands/add-blog-series.md`          |
| Event (new)                  | event, meetup, add event                                                                      | `.claude/commands/add-event.md`                |
| Event (description/content)  | edit event, event description, event logistics                                                | `.claude/skills/edit-event/SKILL.md`           |
| Team member                  | team member, add member, board member                                                         | `.claude/commands/add-team-member.md`          |
| Partner community            | partner community, add community, partner org                                                 | `.claude/commands/add-community.md`            |
| Resource                     | resource, tool, course, tutorial                                                              | `.claude/commands/add-resource.md`             |
| Archive video                | recorded meeting, archive video, meeting recording                                            | `.claude/commands/add-archive-video.md`        |
| Fundraiser                   | fundraiser, fundraiser page                                                                   | `.claude/skills/update-fundraiser/SKILL.md`    |
| Dependency upgrades          | npm audit, npm install, upgrade astro, security vulnerabilities, ERESOLVE                     | `.claude/skills/upgrade-dependencies/SKILL.md` |
| Social links                 | social link, social media, Instagram, add social, remove social, footer icon, social platform | `.claude/skills/manage-social-links/SKILL.md`  |

---

## Newsletter Conventions

TOC anchors, event tables, buttons, and UTM tagging rules moved to the `edit-newsletter` skill (`.claude/skills/edit-newsletter/SKILL.md`). Remaining implementation details not covered there:

- Newsletter `<SinglePost>` scoped styles: `[&_strong_a]:font-bold [&_a_strong]:font-bold` is applied to force bold weight on links wrapped in `**...**` since prose overrides it.

---

## Markdown Formatting Conventions (Blog Posts)

Moved to the `edit-blog-post` skill (`.claude/skills/edit-blog-post/SKILL.md`) along with Member Spotlight and podcast-embed formatting rules — read that skill when writing or revising blog post body content.

---

## Self-Correction

- **Stale code map**: If you discover that a file path, export name, or directory described above no longer exists or has moved, update the relevant section of this file immediately before proceeding with the task.
- **User corrections**: If the user corrects how work should be done in this repo (workflow, tooling preferences, naming conventions, patterns to avoid), add the correction to the **Local norms** section above so future sessions inherit it.
- **After editing this file**: Run `npm run fix` to apply Prettier formatting before proceeding.
