import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Parses a datetime as New York time if no timezone offset is present.
// Accepts a Date object (from unquoted YAML), "YYYY-MM-DDTHH:mm", "YYYY-MM-DD",
// or a full ISO string with offset.
const nyDate = () =>
  z.union([z.date(), z.string()]).transform((val) => {
    // Already a Date object (Astro parsed an unquoted YAML date as UTC) — return as-is
    if (val instanceof Date) return val;
    // Already has a timezone offset — parse as-is
    if (/[Z+-]\d*:?\d*$/.test(val.trim()) && val.includes('T')) {
      return new Date(val);
    }
    // Date-only or local datetime — interpret as NY midnight / NY time
    const hasTime = val.includes('T');
    const localStr = hasTime ? val : `${val}T00:00:00`;
    // Get the NY offset at this moment by formatting a reference date
    const ref = new Date(localStr + 'Z');
    const nyOffset =
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        timeZoneName: 'shortOffset',
      })
        .formatToParts(ref)
        .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT-5';
    const offsetMatch = nyOffset.match(/GMT([+-])(\d+)(?::(\d+))?/);
    const offsetStr = offsetMatch
      ? `${offsetMatch[1]}${offsetMatch[2].padStart(2, '0')}:${(offsetMatch[3] ?? '00').padStart(2, '0')}`
      : '-05:00';
    return new Date(`${localStr}${offsetStr}`);
  });

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),
      canonicalSource: z.string().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/post' }),
  schema: z.object({
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageDescription: z.string().optional(),
    imagePosition: z.enum(['top', 'center', 'bottom', 'left', 'right', 'contain']).optional(),

    category: z.string().optional(),
    series: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    authorUrl: z.string().optional(),
    authors: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
    metadata: metadataDefinition(),
    listeningTime: z.string().optional(),
    hiddenFromFeed: z.boolean().optional(),
    hideHeroImage: z.boolean().optional(),
    url: z.string().url().optional(),
  }),
});

const newsletterCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/newsletter' }),
  schema: z.object({
    publishDate: z.date(),
    issue: z.number(),
    draft: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageDescription: z.string().optional(),
    imagePosition: z.enum(['top', 'center', 'bottom', 'left', 'right', 'contain']).optional(),
    authors: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
    metadata: metadataDefinition(),
  }),
});

const eventCollection = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: '**/*.md', base: 'src/content/meetups' }),
  schema: z.object({
    title: z.string(),
    dateTime: nyDate(),
    endDate: nyDate().optional(),
    location: z.array(z.string()),
    url: z.string().optional(),
    data_luma_event_id: z.string().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    imgpos: z.string().optional().default('object-top object-cover'),
    cost: z.number().optional(),
    tags: z.array(z.string()),
    partnerEvent: z.boolean().optional().default(false),
    partnerOrganization: z.string().optional(),
    slug: z.string().optional(),
  }),
});

const committeeCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/committees' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    chairs: z.array(z.string()),
    members: z.array(z.string()).optional(),
    hidden: z.boolean().optional(),
  }),
});

const resourcesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    category: z.enum(['bioinformatics', 'machine-learning', 'math', 'biology', 'coding', 'professional-development']),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const seriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageFit: z.enum(['cover', 'contain']).optional().default('cover'),
    defaultOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

const communitiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/partnerCommunities' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    website: z.string().url(),
    focus: z.array(z.string()),
    category: z.enum(['bioinformatics', 'biotech', 'data-science']),
    location: z.string().optional(),
    female: z.boolean().default(false),
    boston: z.boolean().default(false),
  }),
});

export const collections = {
  post: postCollection,
  event: eventCollection,
  newsletter: newsletterCollection,
  committee: committeeCollection,
  resources: resourcesCollection,
  series: seriesCollection,
  communities: communitiesCollection,
};
