import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import {
  cleanSlug,
  trimSlash,
  BLOG_BASE,
  POST_PERMALINK_PATTERN,
  CATEGORY_BASE,
  TAG_BASE,
  SERIES_BASE,
} from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
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

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    imageAlt,
    imageDescription,
    imagePosition,
    tags: rawTags = [],
    category: rawCategory,
    series: rawSeries,
    authors: rawAuthors, // new format
    author, // legacy fallback
    authorUrl = '#', // legacy fallback
    listeningTime,
    draft = false,
    hiddenFromFeed = false,
    hideHeroImage = false,
    metadata = {},
    url,
  } = data;

  const slug = cleanSlug(id);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  const series = rawSeries
    ? {
        slug: cleanSlug(rawSeries),
        title: rawSeries,
      }
    : undefined;

  // Normalize authors with fallback support
  const authors = rawAuthors
    ? rawAuthors.map((a) => ({
        name: a.name,
        url: a.url,
      }))
    : author
      ? [{ name: author, url: authorUrl }]
      : undefined;

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,
    imageAlt: imageAlt,
    imageDescription: imageDescription,
    imagePosition: imagePosition,

    category: category,
    series: series,
    tags: tags,
    authors, // updated field

    draft: draft,
    hiddenFromFeed: hiddenFromFeed,
    hideHeroImage: hideHeroImage,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    url: url,

    readingTime: remarkPluginFrontmatter?.readingTime,
    listeningTime: listeningTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  // only post blogs published before today
  const nyNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const posts = await getCollection('post', ({ data }: CollectionEntry<'post'>) => {
    const pubDate = new Date(data.publishDate);
    const nyPubDate = new Date(pubDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return nyPubDate <= nyNow;
  });
  //const posts = await getCollection('post')
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;
export const isBlogSeriesRouteEnabled = APP_BLOG.series.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;
export const blogSeriesRobots = APP_BLOG.series.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** Fetch posts filtered for the main blog feed (excludes hiddenFromFeed posts) */
export const fetchFeedPosts = async (): Promise<Array<Post>> => {
  const posts = await fetchPosts();
  return posts.filter((post) => !post.hiddenFromFeed);
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchFeedPosts();

  if (!posts) return [];

  // Filter posts that have a valid image
  const postsWithImages = posts.filter((post) => Boolean(post.image));

  return postsWithImages ? postsWithImages.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchFeedPosts(), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

const BLOG_EXCLUDED_CATEGORIES = ['Podcast', 'Video'];

/** Returns all feed posts on a single page (no pagination) for client-side filtering.
 * Also passes a seriesList so series cards can be shown under "Series only". */
export const getStaticPathsBlogListAll = async () => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  const allPosts = await fetchPosts();
  const seriesMetadata = await fetchSeriesMetadata();

  const posts = allPosts.filter(
    (post) => !post.hiddenFromFeed && !BLOG_EXCLUDED_CATEGORIES.includes(post.category?.title || '')
  );

  // Build series list across all non-excluded posts (including hiddenFromFeed)
  const eligiblePosts = allPosts.filter((post) => !BLOG_EXCLUDED_CATEGORIES.includes(post.category?.title || ''));
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const seriesLatestDate: Record<string, number> = {};
  const seriesHasNewPost: Record<string, boolean> = {};
  eligiblePosts.forEach((post) => {
    if (post.series?.slug) {
      const d = new Date(post.publishDate).getTime();
      if (!seriesLatestDate[post.series.slug] || d > seriesLatestDate[post.series.slug]) {
        seriesLatestDate[post.series.slug] = d;
      }
      if (new Date(post.publishDate) >= thirtyDaysAgo) {
        seriesHasNewPost[post.series.slug] = true;
      }
    }
  });
  const seriesSlugsSeen = new Set<string>();
  const seriesList: Array<{
    slug: string;
    title: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    imageFit?: 'cover' | 'contain';
    latestPostDate: number;
    hasNewPost: boolean;
  }> = [];
  eligiblePosts.forEach((post) => {
    if (post.series?.slug && !seriesSlugsSeen.has(post.series.slug)) {
      seriesSlugsSeen.add(post.series.slug);
      const meta = seriesMetadata[post.series.slug];
      seriesList.push({
        ...(meta ?? { slug: post.series.slug, title: post.series.title }),
        latestPostDate: seriesLatestDate[post.series.slug],
        hasNewPost: seriesHasNewPost[post.series.slug] ?? false,
      });
    }
  });

  return [
    {
      params: { blog: BLOG_BASE || undefined },
      props: { posts, seriesList },
    },
  ];
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** Load series metadata from the series content collection, keyed by slug */
const fetchSeriesMetadata = async (): Promise<
  Record<
    string,
    {
      slug: string;
      title: string;
      description?: string;
      image?: string;
      imageAlt?: string;
      imageFit?: 'cover' | 'contain';
      defaultOrder?: 'asc' | 'desc';
    }
  >
> => {
  const entries = await getCollection('series');
  const map: Record<
    string,
    {
      slug: string;
      title: string;
      description?: string;
      image?: string;
      imageAlt?: string;
      imageFit?: 'cover' | 'contain';
      defaultOrder?: 'asc' | 'desc';
    }
  > = {};
  entries.forEach((entry) => {
    const slug = cleanSlug(entry.id.replace(/\.md$/, ''));
    map[slug] = {
      slug,
      title: entry.data.title,
      description: entry.data.description,
      image: entry.data.image,
      imageAlt: entry.data.imageAlt,
      imageFit: entry.data.imageFit,
      defaultOrder: entry.data.defaultOrder,
    };
  });
  return map;
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const seriesMetadata = await fetchSeriesMetadata();
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) => {
    const allCategoryPosts = posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug);

    // Collect unique series within this category, enriched with collection metadata + latest post date
    const seriesLatestDate: Record<string, number> = {};
    allCategoryPosts.forEach((post) => {
      if (post.series?.slug) {
        const ms = new Date(post.publishDate).getTime();
        if (!seriesLatestDate[post.series.slug] || ms > seriesLatestDate[post.series.slug]) {
          seriesLatestDate[post.series.slug] = ms;
        }
      }
    });
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const seriesHasNewPost: Record<string, boolean> = {};
    allCategoryPosts.forEach((post) => {
      if (post.series?.slug && new Date(post.publishDate) >= thirtyDaysAgo) {
        seriesHasNewPost[post.series.slug] = true;
      }
    });
    const seriesSlugsSeen = new Set<string>();
    const seriesList: Array<{
      slug: string;
      title: string;
      description?: string;
      image?: string;
      imageAlt?: string;
      imageFit?: 'cover' | 'contain';
      latestPostDate: number;
      hasNewPost: boolean;
    }> = [];
    allCategoryPosts.forEach((post) => {
      if (post.series?.slug && !seriesSlugsSeen.has(post.series.slug)) {
        seriesSlugsSeen.add(post.series.slug);
        const meta = seriesMetadata[post.series.slug];
        seriesList.push({
          ...(meta ?? {
            slug: post.series.slug,
            title: post.series.title,
            image: typeof post.image === 'string' ? post.image : undefined,
          }),
          latestPostDate: seriesLatestDate[post.series.slug],
          hasNewPost: seriesHasNewPost[post.series.slug] ?? false,
        });
      }
    });

    // Hide series posts from the category listing — they are represented by series cards instead.
    const categoryPosts = allCategoryPosts.filter((post) => {
      if (post.hiddenFromFeed) return false;
      if (post.series?.slug) return false;
      return true;
    });

    return paginate(categoryPosts, {
      params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
      pageSize: blogPostsPerPage,
      props: { category: categories[categorySlug], seriesList },
    });
  });
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogSeries = async () => {
  if (!isBlogEnabled || !isBlogSeriesRouteEnabled) return [];

  const posts = await fetchPosts();
  const seriesMetadata = await fetchSeriesMetadata();
  const seriesMap: Record<string, { slug: string; title: string }> = {};
  posts.map((post) => {
    if (post.series?.slug) {
      seriesMap[post.series.slug] = post.series;
    }
  });

  return Array.from(Object.keys(seriesMap)).map((seriesSlug) => {
    const meta = seriesMetadata[seriesSlug];
    const seriesPosts = posts.filter((post) => post.series?.slug && seriesSlug === post.series?.slug);
    const categorySlug = seriesPosts[0]?.category?.slug ?? null;
    return {
      params: { series: seriesSlug, blog: SERIES_BASE || undefined, page: undefined },
      props: {
        series: meta ?? seriesMap[seriesSlug],
        posts: seriesPosts,
        categorySlug,
      },
    };
  });
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.series && originalPost.series && iteratedPost.series.slug === originalPost.series.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}
