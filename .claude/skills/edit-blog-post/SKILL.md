---
name: edit-blog-post
description: Write, revise, or polish the body/prose content of a BWIB blog post (files under src/content/post/) — applying the site's Markdown formatting conventions (inline code, bold, headings), the Member Spotlight title format, and the podcast (.mdx) embed pattern. Use this whenever the user wants to write, rewrite, format, or fix a blog post's body content, not just its frontmatter. If the post file doesn't exist yet, use the add-blog-post command first to scaffold it, then come back to this skill for the body.
---

Write or revise the body content of a blog post in `src/content/post/`. If the post file doesn't exist yet, use `/add-blog-post` first to scaffold the frontmatter and file location.

## Markdown Formatting Conventions

Use these consistently in blog post body content:

| Element                                   | Format                               | Example                                                      |
| ----------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| Variable/field names, IDs, numeric values | Inline code (backticks)              | `` `22420` ``, `` `1` ``, `` `-3` ``                         |
| UI tab names, button labels, page names   | Bold                                 | `**Data** tab`, `**Settings** page`, `**Check for Updates**` |
| Key domain terms being defined            | Bold (first use) or `###` subheading | `**Coding**` or `### Coding`                                 |
| File paths, code identifiers              | Inline code (backticks)              | `` `src/utils/blog.ts` ``                                    |

Inline code renders with a styled pill background (gray-100 light / slate-800 dark) via `.prose :not(pre) > code` in `tailwind.css`. Tailwind Typography's quote pseudo-elements are suppressed, so don't rely on them for emphasis.

## Special Post Types

**Member Spotlight posts:**

- Title format: `'Member Spotlight: First Last'` — use a Unicode non-breaking space (U+00A0) between first and last name so the name never wraps mid-name.
- `SinglePost.astro` detects the `Member Spotlight:` prefix and renders it at smaller size (`!text-2xl`) on its own line above the name — no extra markup needed in the body for this.

**Podcast posts (.mdx):**

- Include the Spotify embed iframe and Apple/Spotify/RSS listen links using React icons. Model after existing files in `src/content/post/coffeewithcompbio/`.
- Import pattern at top of MDX body:
  ```
  import { FaBell, FaSpotify, FaApple } from 'react-icons/fa';
  ```

## Code Fences

Use plain language identifiers (` ```python `, ` ```bash `) — not the Quarto/R-Markdown `{python}`/`{bash}` style. Shiki (the site's syntax highlighter) doesn't recognize the curly-brace form and silently falls back to unhighlighted plaintext.

## After Editing

Run Prettier on the file:

```bash
npx prettier --write src/content/post/{subdir}/{filename}
```
