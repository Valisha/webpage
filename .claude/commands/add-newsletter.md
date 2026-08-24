Generate a new newsletter issue **outline** as an MDX file in `src/content/newsletter/` — frontmatter, a table-of-contents skeleton, and the required boilerplate closing sections. This only scaffolds the file; use the `edit-newsletter` skill afterward to write the section content and prepare the issue for publication.

Newsletter issues are `.mdx` (not `.md`) because the Executive Board boilerplate section embeds a live Astro component (`~/components/newsletter/ExecutiveBoard.astro`) — the newsletter collection's loader in `src/content.config.ts` accepts both `**/*.{md,mdx}`, but only `.mdx` can import/render components. Older issues (001–007) remain plain `.md` and are unaffected.

## Step 1 — Check Existing Issue Numbers

Before asking for any information, read the files in `src/content/newsletter/` and list all existing `issue:` values. The new issue number must not duplicate any existing one — warn the user if there is a conflict.

## Step 2 — Gather Information

Ask the user for the following. Use `$ARGUMENTS` as context if the user already provided some details.

**Required:**

- `issue` — issue number as an integer (must be unique)
- `title` — name of the newsletter issue (typically `'Issue NNN: Month YYYY'`)
- `publishDate` — publication date in `YYYY-MM-DD` format (no time or timezone)

**Optional (omit from file if not provided):**

- `excerpt` — one-sentence description shown on the newsletter listing page
- `image` — path to the hero image (e.g. `/photos/my-image.jpg`)
- `imageAlt` — alt text describing the image's _purpose_, not its appearance. Do not include "image" or "photo".
- `imageDescription` — caption or citation shown below the hero image
- `imagePosition` — `top`, `center` (default), `bottom`, `left`, `right`, or `contain`
- `authors` — list of authors, each with `name` and optional `url` (LinkedIn profile)
- `metadata.title` — page title shown in Google search results (overrides newsletter title)
- `metadata.description` — meta description (keep under two sentences; often matches `excerpt`)

Also ask what content sections this issue will cover (e.g. "Events on the Horizon", "Member Spotlight", "President's Letter"). The user can add, rename, or remove sections later — this just seeds the outline.

## Step 3 — Determine File Path

File path: `src/content/newsletter/issue-{NNN}.mdx`  
Zero-pad the issue number to 3 digits (e.g. issue 8 → `issue-008.mdx`).

## Step 4 — Create the File

Write the frontmatter using only the fields that were provided (omit unsupplied optional fields; no placeholder comments). Then write the body skeleton:

- A table of contents: one `- [Section](#anchor)` entry per planned content section, followed by entries for the three required boilerplate sections (`Get Involved`, `Executive Board`, `Social Media`)
- One `<div id="anchor" class="scroll-mt-[80px]"></div>` + empty `## Section Name` heading (anchor div comes *before* the heading, not after — anchor scrolling puts the div at the top of the viewport, so a div placed after the heading scrolls the heading itself out of view) per planned content section, left for the author to fill in during editing. The `scroll-mt-[80px]` offsets for the site's sticky header, which otherwise covers the anchor target — headings elsewhere get this via `prose-headings:scroll-mt-[80px]` on the prose wrapper, but that only targets real heading elements, not a plain `<div>`.
- The three required boilerplate sections below, copied verbatim (these must appear at the end of every newsletter, in this order):

```mdx
<div id="get-involved" class="scroll-mt-[80px]"></div>

## Get Involved

Boston Women in Bioinformatics runs entirely on volunteer energy, and we're always looking for passionate people to join us. From organizing events and producing the podcast to managing finances and advocating for equity in the field, there's a place for every skill set. Learn more at [boston-wib.org/about/committees](https://boston-wib.org/about/committees?utm_source=newsletter&utm_medium=email&utm_campaign=resource-page)

---

<div id="exec-board" class="scroll-mt-[80px]"></div>

## 🏛️ Executive Board

import ExecutiveBoard from '~/components/newsletter/ExecutiveBoard.astro';

<ExecutiveBoard />

---

<div id="social-media" class="scroll-mt-[80px]"></div>

## Social Media

- **Slack:** [boston-women-bioinfo](https://join.slack.com/t/boston-women-bioinfo/shared_invite/zt-2y78bc7n7-W4TE7kuz8HGz4pzShTeZMQ)
- **Email:** [communications@boston-wib.org](mailto:communications@boston-wib.org)
- **LinkedIn:** [Boston-area Women in Bioinformatics](https://www.linkedin.com/company/boston-women-in-bioinformatics)
- **Instagram:** [@boston_wib](https://www.instagram.com/boston_wib)
- **Lu.ma:** [Boston Women in Bioinformatics](https://luma.com/bwib)
- **Blue Sky** [Boston Women in Bioinformatics](https://bsky.app/profile/boston-wib.bsky.social)
- **Location:** Boston Area, Massachusetts
```

> **Note:** The Get Involved and Social Media copy is taken from the most recent issue — if the user mentions a Slack invite link update or other adjustment, apply it before writing the file. The Executive Board section renders live from `src/config/components/team.js`'s `exec` export via the bare `<ExecutiveBoard />` component while the issue is still a draft, so it always reflects the current board during editing — do not replace it with a static image. Right before publication, the `edit-newsletter` skill freezes this into a per-issue JSON snapshot (`<ExecutiveBoard members={...} />`) so the published issue is a historical record of who was on the board at send time — don't do that snapshotting step here; it happens at finalization, not at outline creation.

## Step 5 — Run Prettier

```bash
npx prettier --write src/content/newsletter/issue-{NNN}.mdx
```

## Step 6 — Hand Off

Tell the user the outline is ready at `src/content/newsletter/issue-{NNN}.mdx`, and that the `edit-newsletter` skill should be used next to write the section content and finalize the issue for publication.
