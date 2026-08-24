Add a new blog post to the BWIB website. Blog posts live in `src/content/post/` (or a subdirectory depending on category/series). This only scaffolds the file's frontmatter and location; use the `edit-blog-post` skill to write or revise the body content once the file exists.

## Step 1 — Gather Information

Ask the user for the following. Use `$ARGUMENTS` as context if the user already provided some details.

**Required:**

- `publishDate` — publication date in `YYYY-MM-DD` format. Posts dated in the future won't appear until that date.
- `title` — name of the blog post. For Member Spotlight posts, see the `edit-blog-post` skill for the exact title format.

**Optional (omit from file if not provided):**

- `updateDate` — date the post was last updated (`YYYY-MM-DD`)
- `draft` — `true` to hide the post until ready; omit or `false` to publish
- `slug` — custom URL identifier (e.g. `blog/deep-dive/my-post-title`)
- `excerpt` — short summary shown on listing pages
- `image` — path to the hero image (e.g. `/blog_images/my-image.png`)
- `imageAlt` — alt text (≤125 chars). Describe the _purpose_, not the appearance. Do not include "image" or "logo".
  - Good: `"Bioinformatics job postings by field in 2024"`
  - Bad: `"A blue and green bar chart showing data"`
- `imageDescription` — caption or citation shown below the hero image
- `imagePosition` — `top`, `center` (default), `bottom`, `left`, `right`, or `contain`. Use `contain` for infographics/diagrams.
- `hideHeroImage` — `true` to hide the hero image from the post top (useful when embedding it manually with a caption)
- Author (use one form, not both):
  - Single author: `author` (name) + `authorUrl` (LinkedIn URL)
  - Multiple authors: `authors` list, each with `name` and optional `url`
- `category` — e.g. `Deep Dive`, `Quick Take`, `Tutorial`, `Video`, `Podcast`, `Interview`
- `series` — title of the series (must match the `title` field in the corresponding `src/content/series/` file exactly)
- `tags` — list of tags (e.g. `bioinformatics`, `career-advice`)
- `url` — external URL where the original post lives (for cross-posts)
- `listeningTime` — reading or listening time (e.g. `5 min`); typically used for podcast/video posts
- `hiddenFromFeed` — `true` only for posts too short to stand alone in the main feed (e.g. Tuesday Tactics micro-posts). Do **not** use just because a post belongs to a series.
- `metadata`:
  - `title` — overrides the post title in browser tab and search results
  - `description` — meta description for search engines
  - `canonical` — canonical URL if originally published elsewhere
  - `canonicalSource` — human-readable name of the canonical source (e.g. `"Work Life Decoded"`)
  - Note: `metadata.image` does nothing — the Open Graph image is always derived from the top-level `image` field. Do not add `metadata.image`.
  - `ignoreTitleTemplate` — `true` to use the metadata title exactly without appending the site name
  - `robots` — `{ index: bool, follow: bool }`

## Step 2 — Determine File Path and Extension

**File extension:**

- `.mdx` if `category: Podcast` (MDX is needed for React icon imports — Spotify, Apple, RSS; see the `edit-blog-post` skill for the embed pattern)
- `.md` for all other categories

**Subdirectory:**

- `category: Podcast` → `src/content/post/coffeewithcompbio/`
- `category: Video` (Work Life Decoded series) → `src/content/post/worklifedecoded/`
- `series: 'Tuesday Tactics'` → `src/content/post/tuesdaytactics/`
- `series: 'Biobank Intro Series'` → `src/content/post/biobankSeries/`
- Everything else → `src/content/post/`

**Filename convention:** `{YYYYMMDD}_{description}.{ext}`

- Use the date from `publishDate`
- Keep the description short and descriptive (e.g. `20260415_post_Dana.md`, `20260530_podcast_coffeeWithCompBio.mdx`)

## Step 3 — Create the File

Write the file using only the fields that were provided. Omit optional fields the user did not supply.

```yaml
---
publishDate: YYYY-MM-DD
title: '...'
updateDate: YYYY-MM-DD
draft: false
slug: 'blog/category/post-title'
excerpt: '...'
image: '/blog_images/...'
imageAlt: '...'
imageDescription: '...'
imagePosition: center
hideHeroImage: false
author: 'Author Name'
authorUrl: 'https://www.linkedin.com/in/...'
# OR for multiple authors:
authors:
  - name: '...'
    url: 'https://www.linkedin.com/in/...'
category: '...'
series: '...'
tags:
  - '...'
url: 'https://...'
listeningTime: '5 min'
hiddenFromFeed: false
metadata:
  title: '...'
  description: '...'
  canonical: 'https://...'
  canonicalSource: '...'
---
MARKDOWN BODY
```

For the body content itself — special formatting for Member Spotlight and Podcast posts, and general Markdown conventions — use the `edit-blog-post` skill.

## Step 4 — Run Prettier

```bash
npx prettier --write src/content/post/{subdir}/{filename}
```

## Step 5 — Output Git Instructions

Print the following commands for the user to run (do not run them automatically):

```
git checkout -b add-blog-{slug}
git add src/content/post/{subdir}/{filename}
# If you uploaded an image:
git add public/blog_images/<your_image_name>
git push -u origin add-blog-{slug}
```

If this post is the first in a new series, remind the user to also run `/add-blog-series` to create the series metadata file.
