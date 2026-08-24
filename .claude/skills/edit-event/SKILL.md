---
name: edit-event
description: Write or revise the description body of a BWIB event page (files under src/content/meetups/) — what attendees will get out of it, logistics, and what to prepare. Use this whenever the user wants to write, expand, or polish an event's body content, not just fill in its frontmatter (date, location, image). If the event file doesn't exist yet, use the add-event command first to scaffold it, then come back to this skill for the description.
---

Write or revise the body content (event description) of an event in `src/content/meetups/`. If the event file doesn't exist yet, use `/add-event` first to scaffold the frontmatter and file location.

## Writing the Description

Ask the user for the following and incorporate the answers into the body prose:

**What attendees will get out of it:**

- What will attendees learn, experience, or walk away with?
- Who is this event for? (e.g. students, early-career professionals, anyone in bioinformatics)

**Logistics (for in-person events):**

- How do attendees get there? Include public transit directions (T stop, bus lines), parking notes, or building entrance instructions if the venue is hard to find.
- Is there a check-in process, name badge, or anything to look for at the door?

**What to prepare beforehand:**

- Anything attendees should bring (laptop, notebook, student ID for discounts, etc.)?
- Any pre-reading, pre-registration steps, or software to install ahead of time?
- Any dietary or accessibility accommodations to be aware of?

Omit any of these sections if the information is not applicable or not yet known — don't invent placeholder text; only write what the user confirms.

## After Editing

Run Prettier on the file:

```bash
npx prettier --write src/content/meetups/{YYYY}/{YYYYMMDD}_event.md
```
