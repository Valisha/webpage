#!/usr/bin/env node
/**
 * Decides whether today's scheduled Netlify build is actually necessary.
 *
 * The site is static output, so three kinds of content need a rebuild to
 * take effect on their own, without a human pushing a commit:
 * - A blog post whose publishDate is today (it should start appearing).
 * - A newsletter issue whose publishDate is today (it should start appearing).
 * - An event whose end date (endDate, falling back to dateTime) was
 *   yesterday (it should move from "upcoming" to the past/archive split).
 *
 * Dates are compared as plain YYYY-MM-DD calendar dates (the date the
 * frontmatter author intended, in America/New_York) rather than fully
 * parsed as timezone-aware Date objects, to avoid UTC-vs-NY drift for a
 * decision that's just "should we bother building today."
 *
 * Exit code 0 + prints "true"/"false" to stdout for the workflow to read.
 * Run: node scripts/needs-daily-build.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function nyDateString(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(date);
}

const today = nyDateString(new Date());
const yesterday = nyDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

function walk(dir, exts) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, exts));
    } else if (exts.includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

function frontmatterField(content, field) {
  const match = content.match(new RegExp(`^${field}:\\s*['"]?([^'"\\n]+)['"]?\\s*$`, 'm'));
  return match ? match[1].trim() : null;
}

function datePart(value) {
  // Frontmatter dates are written as e.g. 2026-06-29T18:00 or 2025-07-11T00:00:00Z
  const match = value?.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
}

const reasons = [];

// --- Posts publishing today ---
const postsDir = join(root, 'src/content/post');
for (const file of walk(postsDir, ['.md', '.mdx'])) {
  const content = readFileSync(file, 'utf-8');
  if (frontmatterField(content, 'draft') === 'true') continue;
  const publishDate = datePart(frontmatterField(content, 'publishDate'));
  if (publishDate === today) {
    reasons.push(`post publishing today: ${file}`);
  }
}

// --- Newsletter issues publishing today ---
const newsletterDir = join(root, 'src/content/newsletter');
for (const file of walk(newsletterDir, ['.md', '.mdx'])) {
  const content = readFileSync(file, 'utf-8');
  if (frontmatterField(content, 'draft') === 'true') continue;
  const publishDate = datePart(frontmatterField(content, 'publishDate'));
  if (publishDate === today) {
    reasons.push(`newsletter issue publishing today: ${file}`);
  }
}

// --- Events crossing into the past as of today ---
const meetupsDir = join(root, 'src/content/meetups');
for (const file of walk(meetupsDir, ['.md'])) {
  const content = readFileSync(file, 'utf-8');
  const endDate = frontmatterField(content, 'endDate');
  const dateTime = frontmatterField(content, 'dateTime');
  const eventEnd = datePart(endDate) ?? datePart(dateTime);
  if (eventEnd === yesterday) {
    reasons.push(`event moving to archive: ${file}`);
  }
}

const needsBuild = reasons.length > 0;

if (needsBuild) {
  console.error('Build needed:');
  for (const reason of reasons) {
    console.error(`  - ${reason}`);
  }
} else {
  console.error('No post, newsletter issue, or event crossing into the past today — skipping build.');
}

console.log(needsBuild ? 'true' : 'false');
