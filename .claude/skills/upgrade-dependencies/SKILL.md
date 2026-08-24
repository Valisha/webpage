---
name: upgrade-dependencies
description: Upgrade npm dependencies in the BWIB website repo, including major-version bumps of astro itself. Use this whenever npm audit, npm install <pkg>@latest, or a general "reduce vulnerabilities" request surfaces peer-dependency (ERESOLVE) conflicts, or when astro/its ecosystem packages need updating. Trigger this automatically the moment an ERESOLVE error or an astro-related CVE shows up in npm audit output, even if the user didn't explicitly ask for this skill by name.
---

Upgrade npm dependencies in the BWIB website repo, including major-version bumps of `astro` itself. Use this whenever `npm audit`, `npm install <pkg>@latest`, or a general "reduce vulnerabilities" request surfaces peer-dependency (`ERESOLVE`) conflicts.

## Background: why `astro` upgrades get blocked

Several astro-ecosystem packages this project once depended on are unmaintained and hard-cap their `peerDependencies.astro` range, which blocks `npm install` from ever resolving a newer `astro`:

- `@astrojs/tailwind` — deprecated by the Astro team in favor of Tailwind's own PostCSS/Vite wiring. Its final release (6.0.2) caps `astro` at `^3||^4||^5`.
- `@astrolib/seo` / `@astrolib/analytics` — abandoned onWidget/AstroWind template packages, last released as `1.0.0-beta.8` / `0.6.1`, both capped at `astro` `^5`.

None of these packages actually calls astro-version-specific APIs — the peer-dep ranges are stale policy declarations, not real incompatibilities. When `npm audit` shows a high-severity `astro` CVE (e.g. reflected XSS via slot names, SSRF via error-page fetch — both only fixed in astro `6.4.6+`) and the fix is blocked by one of these packages, **do not** downgrade or pin `astro` back down to work around it. Instead:

1. **`@astrojs/tailwind`** → delete the integration and its `tailwind()` call from `astro.config.ts`. Add a root-level `postcss.config.cjs`:

   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

   Add `autoprefixer` as an explicit devDependency (it was previously only a transitive dep of `@astrojs/tailwind`). Tailwind itself (`tailwind.config.js`, the actual `tailwindcss` package version, dark-mode classes, custom theme) is untouched — only the wiring mechanism changes. If the project previously had `applyBaseStyles: false` set on the integration, the `@tailwind base;` import is already manual somewhere in the global CSS (e.g. `src/assets/styles/tailwind.css`) and needs no change.

2. **`@astrolib/*` packages** — check actual usage with `grep -rn "@astrolib/analytics\|@astrolib/seo" src/`. If a package is unused (has been true for `@astrolib/analytics`), delete it from `package.json` outright. If it's used (true for `@astrolib/seo`, consumed by `src/components/common/Metadata.astro` and `src/utils/images.ts`), vendor it: `npm pack <pkg>@latest`, extract, and copy its `src/` (or equivalent) into `src/vendor/<name>/` (see "Vendoring convention" below), then update the import sites to `~/vendor/<name>`.

   This is distinct from the root-level `vendor/integration/` directory in this repo — that one holds a build-time Astro _integration_ consumed directly by `astro.config.ts` (a root-level file, loaded before Vite/`~` alias resolution exists), so it has to live outside `src/`. A vendored _runtime_ component/util (like `@astrolib/seo`) is ordinary application code consumed from within `src/`, so it belongs under `src/vendor/` and is reachable via the normal `~/*` alias — do not invent a second top-level alias (e.g. `~vendor`) for this; it's confusing next to `~`.

If a _new_ peer-dep-capped package shows up in a future `npm audit`/`npm install` blocking an `astro` upgrade, apply the same triage: is it unused (delete), replaceable by a native mechanism (do that, like the PostCSS case), or small/vendorable (vendor it under `src/vendor/`)? Only pin `astro` back down as an absolute last resort, and flag it to the user first — it re-blocks the same CVE fixes.

## Content Layer API migration (required for `astro` 6+)

Astro 6 removed the legacy implicit content-collection loader. Any collection in `src/content.config.ts` without an explicit `loader:` will throw `LegacyContentConfigError` at build/check time. Fix:

- Rename `src/content/config.ts` → `src/content.config.ts` (the legacy path is no longer read).
- Add `loader: glob({ pattern: '**/*.md', base: 'src/content/<dir>' })` (from `astro/loaders`) to every `defineCollection(...)` that doesn't already have one. Match the pattern to the actual file extensions present (check with `find src/content/<dir> -type f | sed 's/.*\.//' | sort -u` — e.g. `post` mixes `.md` and `.mdx`, so use `'**/*.{md,mdx}'`).

This changes the shape of `CollectionEntry<T>` objects returned by `getCollection()`/`getEntry()`:

| Legacy loader                  | Content Layer API (`loader: glob(...)`)                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `entry.slug`                   | `entry.id` (raw file path relative to `base`, no extension)              |
| `await entry.render()`         | `import { render } from 'astro:content'; await render(entry)`            |
| `entry.body` (always a string) | `entry.body` (now `string \| undefined` — guard with `entry.body ?? ''`) |

To derive a URL slug from `id`, run it through `cleanSlug()` from `~/utils/permalinks` (applies the same `limax` slugify used everywhere else), e.g. `const slug = cleanSlug(entry.id);`. Grep for `\.slug\b` and `\.render()` on any `CollectionEntry<...>` typed variable across `src/utils/blog.ts`, `src/utils/newsletter.ts`, `src/pages/rss.xml.ts`, `src/pages/newsletter-rss.xml.ts`, and any page importing a collection directly — those are exactly the call sites that break. `src/pages/events/[...slug].astro` already uses the correct `render(meeting)` / `meeting.data.slug ?? meeting.id` pattern for a collection that was migrated earlier — match it.

After migrating, run `npx astro check` and grep its output for `error` (ignore `ts(6385)` — that's just Zod's `z` deprecation notice bundled with newer astro, not a real problem) to confirm zero errors before running `npm run build`.

## Other things a `major astro` bump tends to break

- **`define:vars` inline scripts with a bare top-level `return`** — Astro's compiler parses these more strictly now and rejects a `return` outside a function body as a compile error (`A 'return' statement can only be used within a function body`). Fix by wrapping the whole script body in an IIFE: `(function () { ...script... })();`.
- **Unused template-scaffold pages** — this repo started from the AstroWind template; leftover demo pages (e.g. a `src/pages/homes/*` directory with Unsplash-hosted demo images) can fail the build if they reference a remote image domain never added to `image.domains` in `astro.config.ts`. Before adding the domain, check `src/navigation.ts` for whether the page is actually linked (commented-out nav entries are a strong signal it's dead) — if unused, delete the page(s) and any dead nav references instead of fixing the image config.

## Verifying the upgrade

1. `rm -rf node_modules package-lock.json && npm install` — for a multi-package major bump, a fresh install resolves peer deps more reliably than an incremental one.
2. `npx astro check` — must report 0 errors.
3. `npm run build` — must complete and emit all expected pages under `dist/`.
4. `npm run dev` (or reuse a running instance), then `curl` a representative page from each route family — home, a blog post, a newsletter issue, an event page, `/rss.xml`, `/newsletter-rss.xml` — and confirm 200s and that Tailwind utility classes actually appear in the rendered HTML (`grep -o 'class="[^"]*"'`) if the Tailwind wiring changed.
5. `npm audit` — confirm the specific CVEs that motivated the upgrade are gone. Vulnerabilities confined to `node_modules/netlify-cli/**` are a devDependency deploy CLI, never shipped to the built site — deprioritize those relative to anything in the actual `astro`/build/runtime dependency chain.
6. Update `AGENTS.md` (Tech Stack version, Configuration Files table, any Local Norm affected) and this skill file if the migration pattern changes.
