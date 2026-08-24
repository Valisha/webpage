import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { marked } from 'marked';

import { SITE, APP_NEWSLETTER } from 'astrowind:config';
import { getPermalink, cleanSlug } from '~/utils/permalinks';

// Helper function to remove import statements from markdown/MDX
const cleanImports = (content: string): string => {
  return content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '').trim();
};

// Helper function to convert relative image paths to absolute URLs
const processImages = (html: string, siteUrl: string): string => {
  // Convert relative image paths to absolute URLs
  return html.replace(/src="\/([^"]+)"/g, `src="${siteUrl}/$1"`).replace(/src='\/([^']+)'/g, `src='${siteUrl}/$1'`);
};

export const GET = async () => {
  if (!APP_NEWSLETTER.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  // Get all published newsletters (not drafts, not future-dated)
  const newsletters = (
    await getCollection(
      'newsletter',
      ({ data }: CollectionEntry<'newsletter'>) => !data.draft && new Date(data.publishDate) <= new Date()
    )
  ).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const rss = await getRssString({
    title: `${SITE.name}'s Newsletter`,
    description: 'Stay updated with our latest newsletters',
    site: import.meta.env.SITE,

    items: await Promise.all(
      newsletters.map(async (newsletter) => {
        const cleanedBody = cleanImports(newsletter.body || '');
        const bodyHtml = await marked.parse(cleanedBody);
        const processedHtml = processImages(bodyHtml, import.meta.env.SITE);

        // Add featured image at the top if it exists
        let content = '';
        if (newsletter.data.image) {
          const imageUrl =
            typeof newsletter.data.image === 'string'
              ? newsletter.data.image.startsWith('http')
                ? newsletter.data.image
                : `${import.meta.env.SITE}${newsletter.data.image}`
              : newsletter.data.image;
          const altText = newsletter.data.imageAlt || newsletter.data.title;
          content += `<img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto;" />\n\n`;
        }

        content += newsletter.data.excerpt
          ? `<p><em>${newsletter.data.excerpt}</em></p>\n\n${processedHtml}`
          : processedHtml;

        return {
          link: getPermalink(cleanSlug(newsletter.id), 'post'),
          title: newsletter.data.title,
          content,
          pubDate: newsletter.data.publishDate,
        };
      })
    ),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
