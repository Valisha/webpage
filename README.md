# Boston-Area Women in Bioinformatics Website

<img src="src/assets/favicons/WIB_Logo.png" alt="Logo for Boston-Area Women in Bioinformatics" width="100">

## Quick Links

- [Using Claude Code Skills (Recommended)](#using-claude-code-skills)
- [Don't have Claude Code?](#dont-have-claude-code)
- [Getting started with the website (Mac)](#getting-started-with-the-website-mac)
- [Getting started without write-access](#getting-started-without-write-access)
- [Manual Instructions](#manual-instructions)
- [Image Organization](#image-organization)

## Using Claude Code Skills

This repository includes [Claude Code](https://claude.ai/code) skills that automate common content tasks — adding events, blog posts, newsletters, and more. Instead of manually creating files and filling in frontmatter by hand, you describe what you want and Claude creates the file for you.

### Install Claude Code

1. **Install the CLI:**

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Authenticate** — you'll need an Anthropic API key or a Claude.ai Pro/Max subscription:

   ```bash
   claude
   ```

   Follow the prompts to log in.

3. **Open a terminal in this repository** and run `claude` to start a session.

### Available Commands

| Command              | What it does                                                        |
| :------------------- | :------------------------------------------------------------------ |
| `/add-event`         | Creates a new event page in `src/content/meetups/`                  |
| `/add-blog-post`     | Creates a new blog post in `src/content/post/`                      |
| `/add-blog-series`   | Creates a new series metadata file in `src/content/series/`         |
| `/add-newsletter`    | Creates a new newsletter issue in `src/content/newsletter/`         |
| `/add-archive-video` | Adds a video to the recorded meetings archive                       |
| `/add-resource`      | Adds a new resource to `src/content/resources/`                     |
| `/add-community`     | Adds a new partner community to `src/content/partnerCommunities/`   |
| `/add-team-member`   | Adds a new team member to `team.js` and the relevant committee file |

### How to use a command

1. Open Claude Code in this repository: `claude`
2. Type the command name, e.g. `/add-event`
3. Claude will ask for required and optional fields, create the file, run Prettier, and print the git commands to commit and push your branch

### Skills that trigger automatically

A few workflows aren't typed commands — Claude recognizes them from what you ask for and uses them on its own. Just describe the task in plain language:

- Writing or finishing the content of a newsletter, blog post, or event description (once the file already exists)
- Setting up the annual fundraiser page for a new year
- Upgrading dependencies or resolving `npm audit`/install errors
- Adding, removing, or updating a social media link (Slack, LinkedIn, Instagram, Bluesky, etc.) across the site and newsletters

You can also pass details upfront:

```
/add-event Byte & Bite on September 15 at 6pm at 123 Main St, Boston
```

After Claude creates the file, upload any images to the appropriate `public/` subdirectory (see [Image Organization](#image-organization)) and run the git commands Claude prints.

---

## Don't have Claude Code?

You don't need an AI assistant, or even Astro/Node experience, to contribute. Every content task described above (adding an event, blog post, newsletter, etc.) has a plain step-by-step equivalent below, and none of it requires more than editing a Markdown file and running a couple of terminal commands.

**To make a change without Claude Code:**

1. Set up the project locally — [Getting started with the website (Mac)](#getting-started-with-the-website-mac) if you have write access, or [Getting started without write-access](#getting-started-without-write-access) if you're contributing from a fork.
2. Follow the matching section under [Manual Instructions](#manual-instructions) for the task you're doing (e.g. [Add a new event](#add-a-new-event), [Add a new blog post](#add-a-new-blog-post)). Each one lists the exact frontmatter fields to fill in and the git commands to run at the end.
3. If you get stuck on exactly which fields a file needs or how something should be formatted beyond what's written there, `.claude/commands/*.md` and `.claude/skills/*/SKILL.md` are plain Markdown files with the precise field lists and conventions Claude itself follows — they're a useful reference even without running Claude Code.
4. Push your branch and open a Pull Request on GitHub; a maintainer will review and merge it.

---

## Getting started with the website (Mac)

- Install homebrew :

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

- Add homebrew to path

```
echo >> /Users/yaseswini/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/yaseswini/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

- Install `npm`

```
brew install npm
```

- Install `astro`

```
npm install astro
```

## Getting started without write-access

1. On github, fork the repository to create a copy of it on GitHub under your account.

2. Clone your forked repository

```
git clone https://github.com/{your-username}/webpage.git
```

3. Be in main branch if not already
   `git checkout main`

4. Pull any updated to the main branch
   `git pull`

5. Create a new branch with a descriptive name: `git checkout -b {new-branch}`

## Manual Instructions

Step-by-step instructions for every content type, for anyone who'd rather not use Claude Code (or wants to double-check what it did).

- [Add a new event](#add-a-new-event)
- [Modify event page template](#modify-event-page-template)
- [Add a new blog post](#add-a-new-blog-post)
- [Add a new series](#add-a-new-series)
- [Add a new newsletter](#add-a-new-newsletter)
- [Modify Newsletter template](#modify-newsletter-template)
- [Add a video to the meetings archive](#add-a-video-to-the-meetings-archive)
- [Add a team member](#add-a-team-member)
- [Adding a Resource](#adding-a-resource)
- [Adding a Community](#adding-a-community)
- [Adding and Editing Committees](#adding-and-editing-committees)
- [Update the banner](#update-the-banner-that-appears-on-every-page)
- [Update social/community links](#update-socialcommunity-links)
- [Update navigation links](#update-navigation-links)
- [Set up the annual fundraiser page](#set-up-the-annual-fundraiser-page)
- [Update the events archive default date](#update-the-events-archive-default-date)

### Add a new event

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-event-{date}` (e.g., `add-event-2024-03-15`).

#### 2. Create a markdown file in the `src/content/meetups` directory.

The markdown file should follow a specific format. In between the top two `---` you must fill out the event parameters. Everything below the second `---` can be in markdown format. Look at the other markdown files for reference.

**Required fields:**

- `title`: name of the event
- `dateTime`: start date and time of the event in New York time. Use `YYYY-MM-DDTHH:mm` (e.g., `2026-09-15T18:00`). The timezone is applied automatically — no offset needed.
- `location`: list of location strings (e.g., `["123 Main St", "Boston, MA"]`)
- `image`: object with two fields:
  - `src`: path to the image (e.g., `/photos/my-event.jpg`)
  - `alt`: alt text for the image — describe the purpose, not the appearance. Do not include the words "image" or "photo".
- `tags`: list of tags (not currently displayed, but required — can be an empty list `[]`)

**Optional fields:**

- `endDate`: end date and time of the event, in the same `YYYY-MM-DDTHH:mm` format as `dateTime`. Required if the event spans multiple days or you want the end time to display.
- `url`: registration or event link (e.g., a Lu.ma URL)
- `data_luma_event_id`: Lu.ma event ID, used to embed a registration button
- `imgpos`: controls which part of the image is visible on the events listing page. Defaults to `object-top object-cover`. See [Tailwind object-position](https://tailwindcss.com/docs/object-position) for options.
- `cost`: ticket price in dollars as a number (e.g., `10`). Omit for free events.
- `partnerEvent`: set to `true` if this event is hosted by a partner organization rather than BWIB directly. Defaults to `false`.
- `partnerOrganization`: name of the partner organization hosting the event (only used when `partnerEvent: true`)
- `slug`: a human-readable URL identifier for the event page (e.g., `byte-and-bite-may-2026`). If omitted, the filename is used instead. Use lowercase words separated by hyphens. Follow these conventions:
  - For events that occur once a year, include the year: `fall-fundraiser-2026`
  - For events that occur multiple times a year (at most once a month), include the month and year: `byte-and-bite-may-2026`

#### 3. Add an image

If the image is a photo of the event, upload it to `public/photos/{year}/` (e.g., `public/photos/2026/`) matching the event's year. If the image is a sponsor or partner organization's logo, upload it to `public/sponsors/` instead (see [Image Organization](#image-organization)). Either way, reference the uploaded path in the markdown file's `image` field.

#### 4. Push changes to website

After creating the markdown file and uploading the image, you can run the following commands to format the files and commit your changes:

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/content/meetups/{newevent}.md
# Stage the changes to commit (use public/sponsors/ instead of public/photos/{year}/ for a sponsor/partner logo):
git add public/photos/{year}/<your_image_name>
git add src/content/meetups/{newevent}.md
#  Commit new changes
git push -u origin add-event-{date}
```

### Modify event page template

To modify the event page template, go to `src/layouts/EventLayout.astro`.

If you want to add parameters to the newsletter markdown files, such as "data-luma-event-id", you will need to also do the following:

- add the new parameter to `eventCollection` in `src/content.config.ts`
- add the new parameter to the `EventLayout` object in `src/pages/events/[...slug].astro`

### Add a new blog post

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-blog-{slug}` where slug matches the unique identifier you'll use for the blog post URL.

#### 2. Create a blog post in markdown

After you enter a new branch, you need to create a markdown file in the `src/content/post` directory.

The markdown file should follow a specific format. In between the top two `---` you must fill out the parameters for the blog post. Everything below the second `---` can be in markdown format. Look at the other markdown files for reference.

**Required fields:**

- `publishDate`: date when the blog post was published. Use `YYYY-MM-DD` (e.g., `2026-04-21`). Posts dated in the future will not appear on the site until that date.
- `title`: name of the blog post

**Optional fields:**

- `updateDate`: date the post was last updated, in the same `YYYY-MM-DD` format as `publishDate`
- `draft`: set to `true` to prevent the post from appearing on the site until it is ready. Omit or set to `false` to publish.
- `slug`: a unique identifier for the blog post used in the URL (e.g., `blog/deep-dive/my-post-title`)
- `excerpt`: short description that appears on the blog listing pages to summarize the post
- `image`: path to the hero image displayed at the top of the post (e.g., `/blog_images/my-image.png`)
- `imageAlt`: alt text for the hero image, shown when images are not rendered or for screen readers. Aim for 125 characters or fewer. Describe the purpose, not the appearance. Do not include the words "image" or "logo" since those are already implied.
  - Good: `"Bioinformatics job postings by field in 2024"`
  - Bad: `"A blue and green bar chart with three bars of different heights showing data"`
- `imageDescription`: caption or citation text shown below the hero image
- `imagePosition`: controls which part of the image is most visible when cropped. Options: `top`, `center` (default), `bottom`, `left`, `right`, `contain`. Use `contain` for infographics or diagrams that should not be cropped.
- `hideHeroImage`: set to `true` to hide the hero image from the top of the post (useful when you want to embed the image manually in the body with a caption)
- author information (use one of the following, not both):
  - `author` + `authorUrl`: name and LinkedIn URL of a single author
  - `authors`: list of authors when there are multiple contributors, each with a `name` and optional `url`
- `category`: category label for the post, e.g., `Deep Dive`, `Quick Take`, `Tutorial`, `Video`, `Podcast`
- `series`: title of the series this post belongs to (must match the `title` in the corresponding `src/content/series/` file). See [Add a new series](#add-a-new-series).
- `tags`: list of tags associated with the post, e.g., `bioinformatics`, `career-advice`, `software-engineering`
- `url`: external URL where the original post lives (used when cross-posting from another site)
- `listeningTime`: reading or listening time displayed on the post (e.g., `5 min`). Typically used for podcast or video posts.
- `hiddenFromFeed`: set to `true` to exclude the post from the main blog feed while keeping it accessible by URL. Reserved for posts that are too short to stand on their own (e.g., Tuesday Tactics micro-posts). Do **not** use this just because a post belongs to a series.
- `metadata`: additional SEO metadata:
  - `title`: page title used in the browser tab and search results (overrides the post title)
  - `description`: meta description for search engines
  - `canonical`: canonical URL if this post was originally published elsewhere
  - `canonicalSource`: human-readable name of the canonical source (e.g., `"Work Life Decoded"`)
  - `ignoreTitleTemplate`: set to `true` to use the metadata title exactly as written, without appending the site name
  - `robots`: object with `index` and/or `follow` booleans to control search engine crawling

> **Starting a new series?** If this post is the first in a new series, also follow the steps in [Add a new series](#add-a-new-series) to create the series metadata file.

#### 3. Add an image (optional)

Upload image to the `public/blog_images` directory of your cloned repository (see [Image Organization](#image-organization)). The image should be referenced in the markdown file using the `image` field in the metadata.

#### 4. Push changes to website

Run the following commands to format the files and commit your changes:

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/content/post/{newblog}.md
# Stage the changes to commit :
git add /public/photos/<your_image_name>
git add src/content/post/{newblog}.md
#  Commit new changes
git push -u origin add-blog-{slug}
```

### Add a new series

A series groups multiple related blog posts under a shared card on category pages. Individual posts still appear separately on the main blog page and in search results.

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-series-{slug}` (e.g., `add-series-biobank-intro`).

#### 2. Create a series metadata file

Create a markdown file in `src/content/series/` named with the series slug (e.g., `biobank-intro-series.md`). This file holds the series title, description, and cover image shown on the series card.

```yaml
---
title: 'Your Series Title'
description: 'A short description of what the series covers.'
image: '/blog_images/your-series-image.png'
imageAlt: 'Tuesday Tactics' # Good: describes purpose. Bad: describes appearance (colors, layout, etc.)
imageFit: cover # Use 'contain' if your image is an infographic that should not be cropped
---
```

The `imageFit` field is optional and defaults to `cover`. Use `contain` when the image is an infographic or diagram that should not be cropped.

- `defaultOrder`: order in which posts in the series are listed. Options: `asc` (oldest first) or `desc` (newest first, default).

#### 3. Tag your blog posts with the series

In each post's frontmatter, add a `series` field referencing the series slug:

```yaml
series: 'Your Series Title'
```

The series slug is derived from the title automatically (lowercase, hyphens for spaces). Posts tagged with a series will be collapsed into a single series card on category pages.

#### 4. Add a series image (optional)

Upload the cover image to `public/blog_images/` (see [Image Organization](#image-organization)) and reference it in the series metadata file.

#### 5. Note on `hiddenFromFeed`

The `hiddenFromFeed: true` flag is reserved for posts that are too short to stand on their own in the main feed (e.g., Tuesday Tactics micro-posts). Do **not** use it simply because a post belongs to a series. Series posts appear individually on the main blog and in search results.

#### 6. Push changes to website

```
# Format the new series file
npx prettier --write src/content/series/{newseries}.md
# Stage and commit
git add src/content/series/{newseries}.md
git add public/blog_images/<your_image_name>
git push -u origin add-series-{slug}
```

### Add a new newsletter

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-newsletter-{issue}` (e.g., `add-newsletter-15`).

#### 2. Create a newsletter in markdown

After you enter a new branch, you need to create a markdown file in the `src/content/newsletter` directory.

The markdown file should follow a specific format. In between the top two `---` you must fill out the parameters for the newsletter. Everything below the second `---` can be in markdown format. Look at the other markdown files for reference.

**Required fields:**

- `publishDate`: date when the newsletter was published. Use New York time, so the format will always be one of:
  - `YYYY-MM-DDTHH:mm:ss-04:00` (EDT) from the second Sunday of March through the first Saturday of November
  - `YYYY-MM-DDTHH:mm:ss-05:00` (EST) from the first Sunday of November through the second Saturday of March
- `issue`: issue number as an integer (e.g., `5`)
- `title`: name of the newsletter issue

**Optional fields:**

- `draft`: set to `true` to prevent the newsletter from appearing on the site until it is ready. Omit or set to `false` to publish.
- `excerpt`: short description that appears on the newsletter listing page (should be a sentence or less)
- `image`: path to the hero image displayed at the top of the newsletter page (e.g., `/photos/my-image.jpg`)
- `imageAlt`: alt text for the hero image. Describe the purpose, not the appearance. Do not include the words "image" or "photo".
- `imageDescription`: caption or citation text shown below the hero image
- `imagePosition`: controls which part of the image is most visible when cropped. Options: `top`, `center` (default), `bottom`, `left`, `right`, `contain`.
- `authors`: list of authors, each with a `name` and optional `url` (LinkedIn profile)
- `metadata`: controls what appears when someone searches for the page on Google or shares it on social media:
  - `title`: the page title shown in Google search results (overrides the newsletter title)
  - `description`: the text snippet shown under the title in Google search results. Keep it under two sentences. Often can just match what was written in `excerpt`.

#### 3. Add an image

Upload image to the `public/photos` directory of your cloned repository (see [Image Organization](#image-organization)). The image should be referenced in the markdown file using the `image` field in the metadata.

#### 4. Push changes to website

After creating the markdown file and uploading the image, you can run the following commands to format the files and commit your changes:

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/content/post/{newblog}.md
# Stage the changes to commit :
git add /public/photos/<your_image_name>
git add src/content/post/{newblog}.md
#  Commit new changes
git push -u origin add-newsletter-{issue}
```

### Modify Newsletter template

To modify the newsletter template, go to `src/components/newsletter/SinglePost.astro`.

If you want to add a header image that appears on every newsletter, you can add it in the `SinglePost.astro` file just below the author information section.

If you want to add parameters to the newsletter markdown files, such as "issue number", you will need to also do the following:

- add the new parameter to `newsLetterCollection` in `src/content.config.ts`
- add the new parameter to the `Newsletter` type in `src/types.d.ts`
- modify `getNormalizedNewsletter` function in `src/utils/newsletter.ts` to handle the new parameter.

### Add a video to the meetings archive

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-video-{date}` (e.g., `add-video-2024-03-15`).

#### 2. Edit the archive_meetings java script file

Edit the archive_meetings.js file at `src/config/components/archive_meetings.js`. For the URL use the URL for embedding the video.

#### 4. Push changes to website

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/config/components/archive_meetings.js
# Stage the changes to commit (Assuming you are in the git folder)
git add ./src/config/components/archive_meetings.js
#  Commit new changes
git commit -m "<Add committ message>"
git push -u origin add-video-{date}
```

### Add a team member

> **Using Claude Code?** Run `/add-team-member` instead — it handles all the steps below automatically.

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-team-{member_name}`.

#### 2. Add team member image

Add a headshot of team member image in this location of your cloned repo `/public/team/` (you may want to crop it to match the rest of the photos).

**Important:** After adding the image, run the resize script to optimize it for the web. This prevents pixelation issues and reduces file sizes:

```bash
./scripts/resize-team-images.sh
```

This script automatically resizes any images larger than 500px to a maximum of 500x500 while preserving aspect ratio. Images already 500px or smaller are left unchanged.

#### 3. Edit the team java script file

Edit the team.js file (`src/config/components/team.js`) to populate your information

- There are two different dictionary objects in this file. Fill in your information in the correct dictionary by using either ctrl+f for `const exec` or `const team`
  - `exec` = execuctive team (co-chairs and chairs of committees)
  - `team` = committee members

#### 4. Edit committee page

Validate or add team member name to the correct committee markdown file in the `src/content/committees/` directory.

#### 5. Format the team.js and markdown file

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/config/components/team.js
npx prettier --write src/pages/about/committees.astro
```

#### 6. Stage the files and commit the changes

```
# Stage the changes to commit (Assuming you are in the git folder)
git add ./public/team/<your_image_name>
git add ./src/config/components/team.js
git add ./src/pages/about/committees.astro
#  Commit new changes
git commit -m "<Add committ message>"
git push -u origin add-team-{member_name}
```

### Adding a Resource

Resources include courses, tutorials, tools, documentation, and other learning materials relevant to bioinformatics and computational biology.

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-resource-{new_resource}`.

#### 2. Create a new file

Navigate to `src/content/resources/` and create a new markdown file. Name it based on the resource name or descriptively.

#### 3. Add frontmatter

Copy this template and fill in the details:

```yaml
---
title: 'Name of the Resource'
description: 'A concise description of what this resource offers (1-2 sentences)'
url: 'https://example.com'
category: 'bioinformatics' # Current available options: bioinformatics, machine-learning,professional-development, coding, math, biology.
tags:
  - 'Python'
  - 'genomics'
  - 'visualization'
featured: false # Set to true only for exceptional resources
---
```

#### 4. Add a NEW Resource Category (Optional)

The Resources collection uses a strict list of categories to ensure data consistency and to power website filters. If you are adding a resource that doesn't fit into the existing categories, follow these steps to update the schema.

1. Open the configuration file by navigating to `src/content.config.ts`.
2. Locate the `resourcesCollection` definition by scrolling down to the `resourcesCollection` definition (**around line 175**). You will see the category field defined with `z.enum([...])`.
3. Add your new category string to the array inside the `z.enum` list. **Note:** Use kebab-case (e.g.data-visualization) for the value.
4. Once you save the file, the TypeScript compiler/Astro build will now allow this new string in your Markdown frontmatter.

#### 5. Push to website

1. Commit your changes: `git commit -m "Add {new_resource}"`
2. Push to your fork: `git push -u origin add-resource-{new_resource}`
3. Open a Pull Request with a clear description

### Adding a Community

Communities include organizations, networks, local chapters, and online groups in bioinformatics and related fields.

#### 1. Open a new branch locally

See [Getting started without write-access](#getting-started-without-write-access). Give branch name the format `add-community-{new_community}`.

#### 2. Create a new file

Navigate to `src/content/partnerCommunities/` and create a new markdown file:

```
r-ladies.md
women-in-data.md
pyladies.md
```

#### 3. Add frontmatter

Copy this template:

```yaml
---
name: 'Organization Name'
description: "A clear description of the organization's mission and activities"
website: 'https://example.org'
focus: # same as tags
  - networking
  - computational-biology
  - bioinformatics
  - biotech
category: 'bioinformatics' # Options: bioinformatics, biotech, data-science
location: 'Boston, MA' # Use "Global" if worldwide, or specify region
female: false # Set to true if organization is women-focused
boston: false # Set to true if organization meets in Boston
---
```

#### 4. Push to website

1. Commit your changes: `git commit -m "Add {new_community}"`
2. Push to your fork: `git push -u origin add-community-{new_community}`
3. Open a Pull Request with a clear description

### Adding and Editing Committees

**To edit committee information:**

1. Add or edit the markdown files in `src/content/committees/ ` directory.
2. Update the frontmatter for metadata (chairs, members, description)
3. Edit the markdown content below the frontmatter for detailed information
4. Format the new committee file and stage changes for git

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/content/committees/{newcommittee}.md
# Stage the changes to commit :
git add src/content/committees/{newcommittee}.md
#  Commit new changes
git commit -m "<Add committ message>"
git push -u origin <new-branch-name>
```

After editing committee files or `team.js`, `npm run fix` also runs `check:committees`, which cross-checks that every chair listed in a committee file has a matching "Chair" title in `team.js` and vice versa. If there's a mismatch the script will report it.

**To add a new committee**:

1. Create a new .md file in `src/content/committees/` directory.
2. Add frontmatter with required fields (id, title, description, chairs)
3. Add markdown content
4. Format the new committee file and stage changes for git

```
# Run 'npx --prettier' to fix any astro specific formatting issues
npx prettier --write src/content/committees/{newcommittee}.md
# Stage the changes to commit :
git add src/content/committees/{newcommittee}.md
#  Commit new changes
git commit -m "<Add committ message>"
git push -u origin <new-branch-name>
```

### Update the banner that appears on every page

To add or remove the banner, go to `src/layouts/PageLayout.astro` and add or remove the following lines respectively:

```
<slot name="banner">
  <Banner client:load />
</slot>
```

To edit the banner, go to `src/components/common/Banner.astro` and edit the text inside the `<p>` tag. You can also change the text and link in the `<a>` tag to point to a different page.

### Update social/community links

The Slack invite link, LinkedIn page URL, and Luma calendar URL are each defined once in `src/config/social.ts` and imported wherever they appear on the site. To update any of them, edit only that file.

```ts
// src/config/social.ts
export const SLACK_INVITE_URL = 'https://docs.google.com/forms/d/e/...'; // registration form — fills out before joining Slack
export const LINKEDIN_URL = 'https://www.linkedin.com/company/boston-women-in-bioinformatics';
export const LUMA_URL = 'https://luma.com/bwib';
```

**When to update each constant:**

- `SLACK_INVITE_URL` — points to the Google Form people fill out before being admitted to Slack. Update this if the form URL changes (e.g., a new form is created for a new year's cohort).
- `LINKEDIN_URL` — update if the LinkedIn company page URL ever changes.
- `LUMA_URL` — update if the organization's Luma calendar slug changes.

**What is not covered here:**

- Individual event registration URLs (set in each event's `url` frontmatter field — see [Add a new event](#add-a-new-event))
- Email addresses (see `EMAIL_AUDIT.md` in the project root for a full list of where each address appears)
- Newsletter footers (issues 1–7) contain hardcoded links and are historical — do not update them

**Push changes to website:**

```
npx prettier --write src/config/social.ts
git add src/config/social.ts
git commit -m "Update social link"
git push
```

### Update navigation links

All header navigation is defined in `src/navigation.ts` in the `headerData.links` array. Each item is either a flat link or a dropdown.

**Flat link:**

```ts
{
  text: 'Contact',
  href: getPermalink('/contact'),
},
```

**Dropdown:**

```ts
{
  text: 'Events',
  href: getPermalink('/events'),   // where the top-level label links to
  links: [
    { text: 'Upcoming Events', href: getPermalink('/events') },
    { text: 'Archive', href: getPermalink('/events/archive') },
  ],
},
```

Always use `getPermalink('/path')` for internal pages rather than hardcoding the URL. External URLs (e.g. Givebutter) can be used as plain strings.

To temporarily hide a link without deleting it, comment it out:

```ts
// { text: 'Old Event', href: getPermalink('/events/old-event') },
```

After editing, run:

```
npx prettier --write src/navigation.ts
git add src/navigation.ts
git commit -m "Update navigation"
git push
```

### Set up the annual fundraiser page

> **Using Claude Code?** Just ask it to set up the fundraiser page for the new year — it recognizes this task automatically and walks through all the steps interactively.

The fundraiser is a standalone `.astro` page under `src/pages/events/` (e.g. `fall-fundraiser-2026.astro`). Each year a new page is created by adapting the previous year's file.

#### 1. Open a new branch

Give it the format `update-fundraiser-{year}` (e.g. `update-fundraiser-2027`).

#### 2. Create the new page file

Copy the current year's page (e.g. `fall-fundraiser-2026.astro`) to a new file with the new year's slug (e.g. `fall-fundraiser-2027.astro`). Then update:

- `eventTitle`, `theme`, and `themeDescription` in the hero section
- `date`, `location`, and ticket price
- `givebutter_url` for the register button
- Sponsorship tier names, prices, and benefits
- The `subject=` parameter in the "Become a Sponsor" email link

Sections that aren't ready yet (speakers, agenda, waitlist form) can be left commented out and uncommented as details are confirmed. The email sign-up form should always be active from the start.

#### 3. Create a speakers config file (when speakers are confirmed)

Create `src/config/components/{pageSlug}Speakers.js` modeled after `src/config/components/tenyearannSpeakers.js`. Each speaker entry includes `name`, `title`, `avatar` (path in `/team/`), and optional social links.

#### 4. Update the navigation link

In `src/navigation.ts`, update the fundraiser entry in the Events dropdown to point to the new page and update the label text:

```ts
{ text: 'Fall Fundraiser 2027', href: getPermalink('/events/fall-fundraiser-2027') },
```

#### 5. Handle the old page

Decide whether to delete the old page or keep it as an archive at its existing URL. If deleting: `git rm src/pages/events/fall-fundraiser-2026.astro`.

#### 6. Upload logos

Upload the light-mode and dark-mode event logos to `public/photos/{year}/` and update the paths in the new page file.

#### 7. Push changes

```
npx prettier --write src/pages/events/{pageSlug}.astro
npx prettier --write src/navigation.ts
git add src/pages/events/{pageSlug}.astro src/navigation.ts
git add public/photos/{year}/
git push -u origin update-fundraiser-{year}
```

### Update the events archive default date

The archive page (`src/pages/events/archive/index.astro`) has a hardcoded `DEFAULT_START` date used as the default "From" date in the date range filter. Update it annually so the archive doesn't open showing several years of past events by default.

Find this line near the top of the client-side script block and update the date:

```js
const DEFAULT_START = '2025-08-08';
```

Use the date roughly one year before today in `YYYY-MM-DD` format. The `min` attribute on the date picker (`min="2024-08-08"`) is the date of the first-ever BWIB event and should never be changed.

```
npx prettier --write src/pages/events/archive/index.astro
git add src/pages/events/archive/index.astro
git commit -m "Update archive default start date"
git push
```

## Image Organization

Store images in the `public/` directory following these conventions:

- **General/event photos** → `public/photos/{year}/` (e.g., `public/photos/2026/20260822_BAX_event.png`)
- **Team member headshots** → `public/team/`
- **Sponsor/partner organization logos** → `public/sponsors/` — used as an event's `image` field when the image is the sponsoring organization's logo rather than a photo of the event itself
- **Blog post images** → `public/blog_images/`

When adding an event photo, upload it into the `public/photos/{year}/` folder matching the event's year (create the folder if it's the first event of a new year). This keeps our photo archive organized chronologically and makes it easy to find images from specific events.

Logos are found in the `src/assets/favicons` directory.

Icon images are found in the `src/assets/images` directory.

## Acknowledgements

This site is built on [AstroWind](https://github.com/onwidget/astrowind), an open-source Astro + Tailwind CSS template originally created by [onWidget](https://onwidget.com), licensed under the [MIT License](./LICENSE.md).
