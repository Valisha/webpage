---
name: update-fundraiser
description: Set up or continue building the annual BWIB fundraiser page for a new year — a new .astro page under src/pages/events/, a speakers config file, and a navigation update. Use this whenever the user wants to create next year's fundraiser page, or wants to add details (date, sponsors, speakers, register link) to a fundraiser page that's already in progress. This is an ongoing, multi-session task: some details (speakers, date, register link) often aren't known yet and get filled in over several conversations as they're confirmed — re-trigger this skill each time the user has new fundraiser details to add.
---

Set up the annual BWIB fundraiser page for a new year. This creates a new `.astro` page under `src/pages/events/`, creates a speakers config file, and updates the navigation link.

The fundraiser happens once a year but the page name and theme change each year (e.g. `fall-fundraiser-2026.astro`, `tenyearanniversary.astro`). Work through the sections below in order — some details won't be known yet, and the page has commented-out sections that get uncommented as details are confirmed. If the page already exists, treat this as a continuation: figure out what's already there and fill in only what's new.

## Step 1 — Gather Core Event Info

Ask for the following. Use `$ARGUMENTS` as context if the user already provided details.

**Required:**

- `year` — the year of the fundraiser (e.g. `2027`)
- `pageSlug` — the URL slug for the new page (e.g. `fall-fundraiser-2027`). The file will be `src/pages/events/{pageSlug}.astro`.
- `eventTitle` — the heading shown on the page (e.g. `2027 Fall Fundraiser`)
- `theme` — the quoted theme name for the event (e.g. `"Where Women Are Leading the Next Wave of Bioinformatics"`)
- `themeDescription` — 2–3 paragraphs describing the theme and what attendees can expect. This is the main body text of the hero section.

**Ask — may not be known yet (mark as TBD if not provided):**

- `date` — event date and time (e.g. `Tuesday, September 29th, 2027`)
- `location` — venue name and address (e.g. `Boynton Yards, Somerville`)
- `ticketPrice` — e.g. `$20.00`
- `lightModeLogo` — path to the light-mode event logo (e.g. `/photos/2027/WIB_Logo_FallFundraiser_lightmode.png`)
- `darkModeLogo` — path to the dark-mode event logo (e.g. `/photos/2027/WIB_Logo_FallFundraiser_darkmode.png`)

## Step 2 — Gather Registration & Forms Info

**Ask — needed to wire up the register button and email forms:**

- `givebutter_url` — Givebutter donation/registration URL (e.g. `https://givebutter.com/BWIB2027`)
- `waitlist_form_url` — Google Forms POST URL for the waitlist form
- `waitlist_entry_id` — the `entry.XXXXXXXXX` field ID for the waitlist email field
- `email_updates_form_url` — Google Forms POST URL for the email sign-up form
- `email_updates_entry_id` — the `entry.XXXXXXXXX` field ID for the email sign-up field

These can all be TBD and the relevant sections left commented out until the user has them.

## Step 3 — Gather Sponsorship Tier Info

**Ask about sponsor tiers:**

- How many tiers? (default: 2 — last year used Gold DNA Sponsor and Silver RNA Sponsor)
- For each tier:
  - Tier name (e.g. `Gold DNA Sponsor`)
  - Price (e.g. `$2,000`)
  - Which benefits does this tier include? Walk through the standard benefit list:
    - Prominent Logo Placement (logo on all event marketing materials)
    - Website Recognition (logo + hyperlink on event website)
    - Social Media Shoutouts (mentions before, during, after)
    - Verbal Recognition (mention during opening/closing speeches)
    - Raffle Table Recognition (name + logo at raffle table)
    - Sponsor Spotlight (3–5 min self-intro at the mic)
    - Named Raffle Category (prize basket named after sponsor)
    - Complimentary Tickets — how many?
  - If the user wants to add new benefits or remove existing ones, update accordingly.

## Step 4 — Gather Speakers Info (optional)

**Ask if speakers are known yet:**

- If yes, for each speaker:
  - `name`
  - `title` — job title / affiliation
  - `nameLink` — LinkedIn or personal website URL (optional)
  - `avatar` — path to headshot in `/team/` (e.g. `/team/jane_doe.jpg`)
  - `linkedin`, `github`, `website`, `bluesky` — social links (all optional)
- If no speakers yet, skip — the speakers section stays commented out.

## Step 5 — Create the Speakers Config File

If speakers were provided, create `src/config/components/{pageSlug}Speakers.js` modeled after `src/config/components/tenyearannSpeakers.js`:

```js
const speakers = {
  enabled: true,
  title: 'Our Speakers',
  description: 'Speakers for {eventTitle}',
  members: [
    // Speaker Name
    {
      name: '...',
      nameLink: '...', // omit if not provided
      title: '...',
      avatar: '/team/...',
      social: {
        linkedin: '...', // omit if not provided
        website: '...', // omit if not provided
        github: '...', // omit if not provided
        bluesky: '...', // omit if not provided
      },
    },
  ],
};

export default speakers;
```

## Step 6 — Create the New Page File

Create `src/pages/events/{pageSlug}.astro` by adapting the current year's page. Follow these rules:

**Always active (uncommented from the start):**

- Hero section with `eventTitle`, `theme`, and `themeDescription`
- Event logo block (use light/dark mode logo paths, or leave placeholder paths if not yet known)
- Email sign-up form (always shown — it captures interest before tickets go on sale)
- Sponsorship tiers section

**Uncomment only when the user confirmed the detail is ready:**

- Register button — only when `givebutter_url` is provided
- Waitlist form — only when `waitlist_form_url` and `waitlist_entry_id` are provided
- Date/location/calendar block — only when `date` and `location` are confirmed (not TBD)
- Agenda table — only when agenda items are provided
- Speakers section — only when speakers are provided

**Imports at top:**

- Always import: `Layout`, `SITE`
- Uncomment when speakers are ready: `import speakers from '~/config/components/{pageSlug}Speakers';` and `import TeamWidget from '~/components/widgets/Team.astro';`
- Uncomment when date/location confirmed: `import AddToCalendarButton from '~/components/AddToCalendarButton.tsx';`
- Uncomment when sponsors are ready: `import SponsorSection from '~/components/Sponsors.astro';`

**Sponsorship table:** Build from the tier info gathered in Step 3. The email subject line in the "Become a Sponsor" contact link should match the event name (e.g. `subject=Fall%20Fundraiser%20Sponsor`).

## Step 7 — Update Navigation

Open `src/navigation.ts` and update the fundraiser `href` to point to the new page:

```ts
href: getPermalink('/events/{pageSlug}'),
```

Also update the link label text if it changed (e.g. `Fall Fundraiser 2027`).

## Step 8 — Handle the Old Page

Ask the user: **Should the old fundraiser page be deleted, or kept as an archive?**

- If deleted: `git rm src/pages/events/{oldPageSlug}.astro`
- If kept: leave it in place (it will remain accessible at its old URL)

## Step 9 — Run Prettier

```bash
npx prettier --write src/pages/events/{pageSlug}.astro
npx prettier --write src/navigation.ts
# If speakers file was created:
npx prettier --write src/config/components/{pageSlug}Speakers.js
```

## Step 10 — Output Git Instructions

Print the following for the user to run:

```
git checkout -b update-fundraiser-{year}
git add src/pages/events/{pageSlug}.astro
git add src/navigation.ts
# If speakers file created:
git add src/config/components/{pageSlug}Speakers.js
# If old page deleted:
git rm src/pages/events/{oldPageSlug}.astro
# If logos uploaded:
git add public/photos/{year}/
git push -u origin update-fundraiser-{year}
```

Remind the user to upload the light-mode and dark-mode event logos to `public/photos/{year}/` before committing (see Image Organization in README.md).
