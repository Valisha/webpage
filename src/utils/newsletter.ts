import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Newsletter } from '~/types';
import { APP_NEWSLETTER } from 'astrowind:config';
import { cleanSlug, trimSlash, NEWSLETTER_BASE, NEWSLETTER_PERMALINK_PATTERN } from './permalinks';

const generatePermalink = async ({ id, slug, publishDate }: { id: string; slug: string; publishDate: Date }) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = NEWSLETTER_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedNewsletter = async (newsletter: CollectionEntry<'newsletter'>): Promise<Newsletter> => {
  const { id, data } = newsletter;
  const { Content, remarkPluginFrontmatter } = await render(newsletter);

  const {
    publishDate: rawPublishDate = new Date(),
    issue,
    title,
    excerpt,
    image,
    imageAlt,
    imageDescription,
    imagePosition,
    authors: rawAuthors, // new format
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id);
  const publishDate = new Date(rawPublishDate);

  // Normalize authors with fallback support
  const authors = rawAuthors
    ? rawAuthors.map((a) => ({
        name: a.name,
        url: a.url,
      }))
    : undefined;

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate }),

    publishDate: publishDate,
    issue: issue,
    title: title,
    excerpt: excerpt,
    image: image,
    imageAlt: imageAlt,
    imageDescription: imageDescription,
    imagePosition: imagePosition,
    authors, // updated field

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Newsletter>> {
  // only post newsletters published before today
  const nyNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const newsletters = await getCollection('newsletter', ({ data }) => {
    const pubDate = new Date(data.publishDate);
    const nyPubDate = new Date(pubDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return nyPubDate <= nyNow;
  });
  //const posts = await getCollection('post')
  const normalizedNewsletters = newsletters.map(async (newsletter) => await getNormalizedNewsletter(newsletter));

  const results = (await Promise.all(normalizedNewsletters))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((newsletter) => !newsletter.draft);

  const seen = new Map<number, string>();
  for (const newsletter of results) {
    if (seen.has(newsletter.issue)) {
      throw new Error(
        `Duplicate newsletter issue number ${newsletter.issue}: found in "${newsletter.id}" and "${seen.get(newsletter.issue)}"`
      );
    }
    seen.set(newsletter.issue, newsletter.id);
  }

  return results;
};

let _newsletters: Array<Newsletter>;

/** */
export const isNewsletterEnabled = APP_NEWSLETTER.isEnabled;
export const isNewsletterListRouteEnabled = APP_NEWSLETTER.list.isEnabled;
export const isNewsletterPostRouteEnabled = APP_NEWSLETTER.post.isEnabled;

export const newsletterListRobots = APP_NEWSLETTER.list.robots;
export const newsletterPostRobots = APP_NEWSLETTER.post.robots;

export const newsletterPostsPerPage = APP_NEWSLETTER?.postsPerPage;

/** */
export const fetchNewsletters = async (): Promise<Array<Newsletter>> => {
  if (!_newsletters) {
    _newsletters = await load();
  }

  return _newsletters;
};

/** */
export const findNewslettersBySlugs = async (slugs: Array<string>): Promise<Array<Newsletter>> => {
  if (!Array.isArray(slugs)) return [];

  const newsletters = await fetchNewsletters();

  return slugs.reduce(function (r: Array<Newsletter>, slug: string) {
    newsletters.some(function (newsletter: Newsletter) {
      return slug === newsletter.slug && r.push(newsletter);
    });
    return r;
  }, []);
};

/** */
export const findNewslettersByIds = async (ids: Array<string>): Promise<Array<Newsletter>> => {
  if (!Array.isArray(ids)) return [];

  const newsletters = await fetchNewsletters();

  return ids.reduce(function (r: Array<Newsletter>, id: string) {
    newsletters.some(function (post: Newsletter) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestNewsletters = async ({ count }: { count?: number }): Promise<Array<Newsletter>> => {
  const _count = count || 4;
  const newsletters = await fetchNewsletters();

  if (!newsletters) return [];

  // Filter newsletters that have a valid image
  const newslettersWithImages = newsletters.filter((newsletter) => Boolean(newsletter.image));

  return newslettersWithImages ? newslettersWithImages.slice(0, _count) : [];
};

/** */
export const getStaticPathsNewsletterList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isNewsletterEnabled || !isNewsletterListRouteEnabled) return [];
  return paginate(await fetchNewsletters(), {
    pageSize: newsletterPostsPerPage,
  });
};

/** */
export const getStaticPathsNewsletterPost = async () => {
  if (!isNewsletterEnabled || !isNewsletterPostRouteEnabled) return [];
  return (await fetchNewsletters()).flatMap((post) => ({
    params: {
      slug: post.permalink.replace(`${NEWSLETTER_BASE}/`, ''), // e.g., 'issue-003'
    },
    props: { post },
  }));
};
