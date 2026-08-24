import { getPermalink, getBlogPermalink, getNewsletterPermalink } from './utils/permalinks';
import {
  SLACK_INVITE_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  BLUESKY_URL,
  YOUTUBE_URL,
  GITHUB_URL,
  TWITTER_URL,
  GIVEBUTTER_URL,
} from './config/social';
export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink(''),
    },
    {
      text: 'Who we are',
      links: [
        {
          text: 'About us',
          href: getPermalink('/about'),
        },
        {
          text: '2025 Annual Report',
          href: getPermalink('/about/annual-report-2025'),
        },
        {
          text: 'Committees',
          href: getPermalink('/about/committees'),
        },
        {
          text: 'FAQ',
          href: getPermalink('/about/faq'),
        },
      ],
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Career Program',
          href: getPermalink('/resources/career-mentorship'),
        },
        {
          text: 'Upskilling Resources',
          href: getPermalink('/resources/upskilling'),
        },
        {
          text: 'Partner Communities',
          href: getPermalink('/resources/partner-communities'),
        },
        {
          text: 'Survey Results',
          href: getPermalink('/resources/survey-results'),
        },
      ],
    },
    {
      text: 'Newsletter',
      href: getNewsletterPermalink(),
    },
    {
      text: 'Team',
      href: getPermalink('/team'),
    },
    {
      text: 'Events',
      href: getPermalink('/events'),
      links: [
        {
          text: 'Upcoming Events',
          href: getPermalink('/events'),
        },
        {
          text: 'Fall Fundraiser 2026',
          href: getPermalink('/events/fall-fundraiser-2026'),
        },
        //{
        //  text: 'Cambridge Science Carnival 2025',
        //  href: getPermalink('/events/ama'),
        //},
        {
          text: 'Event Recordings',
          href: getPermalink('/events/recorded-events'),
        },
        {
          text: 'Archive',
          href: getPermalink('/events/archive'),
        },
      ],
    },
    {
      text: 'Media',
      href: getBlogPermalink(),
      links: [
        {
          text: 'Blogs',
          href: getBlogPermalink(),
        },
        {
          text: 'Podcasts',
          href: getPermalink('podcast', 'category'),
        },
        {
          text: 'Videos',
          href: getPermalink('video', 'category'),
        },
      ],
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Donate',
      href: GIVEBUTTER_URL,
    },
    //{
    //  text: 'Community',
    //  links: [
    // {
    //   text: 'Features (Anchor Link)',
    //   href: getPermalink('/#features'),
    // },
    // {
    //   text: 'Services',
    //   href: getPermalink('/services'),
    // },
    // {
    //   text: 'Pricing',
    //   href: getPermalink('/pricing'),
    // },
    //{
    //  text: 'About us',
    //  href: getPermalink('/about'),
    //},
    // {
    //   text: 'Terms',
    //   href: getPermalink('/terms'),
    // },
    // {
    //   text: 'Privacy policy',
    //   href: getPermalink('/privacy'),
    // },
    //  ],
    //},
    // {
    //   text: 'Landing',
    //   links: [
    //     {
    //       text: 'Lead Generation',
    //       href: getPermalink('/landing/lead-generation'),
    //     },
    //     {
    //       text: 'Long-form Sales',
    //       href: getPermalink('/landing/sales'),
    //     },
    //     {
    //       text: 'Click-Through',
    //       href: getPermalink('/landing/click-through'),
    //     },
    //     {
    //       text: 'Product Details (or Services)',
    //       href: getPermalink('/landing/product'),
    //     },
    //     {
    //       text: 'Coming Soon or Pre-Launch',
    //       href: getPermalink('/landing/pre-launch'),
    //     },
    //     {
    //       text: 'Subscription',
    //       href: getPermalink('/landing/subscription'),
    //     },
    //   ],
    // },
    //{
    //text: 'Blog',
    //href: getBlogPermalink()
    // links: [
    //   {
    //     text: 'Blog List',
    //     href: getBlogPermalink(),
    //   },
    // {
    //   text: 'Article',
    //   href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
    // },
    // {
    //   text: 'Article (with MDX)',
    //   href: getPermalink('markdown-elements-demo-post', 'post'),
    // },
    // {
    //   text: 'Category Page',
    //   href: getPermalink('tutorials', 'category'),
    // },
    // {
    //   text: 'Tag Page',
    //   href: getPermalink('astro', 'tag'),
    // },
    // ],
    //},
    // {
    //   text: 'Widgets',
    //   href: '#',
    // },
  ],
  // actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    // {
    //   title: 'Product',
    //   links: [
    //     { text: 'Features', href: '#' },
    //     { text: 'Security', href: '#' },
    //     { text: 'Team', href: '#' },
    //     { text: 'Enterprise', href: '#' },
    //     { text: 'Customer stories', href: '#' },
    //     { text: 'Pricing', href: '#' },
    //     { text: 'Resources', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Platform',
    //   links: [
    //     { text: 'Developer API', href: '#' },
    //     { text: 'Partners', href: '#' },
    //     { text: 'Atom', href: '#' },
    //     { text: 'Electron', href: '#' },
    //     { text: 'AstroWind Desktop', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     { text: 'Docs', href: '#' },
    //     { text: 'Community Forum', href: '#' },
    //     { text: 'Professional Services', href: '#' },
    //     { text: 'Skills', href: '#' },
    //     { text: 'Status', href: '#' },
    //   ],
    // },
    //{
    //  title: 'Company',
    //  links: [
    //    { text: 'About', href: '#' },
    //    { text: 'Blog', href: '#' },
    //    { text: 'Careers', href: '#' },
    // { text: 'Press', href: '#' },
    // { text: 'Inclusion', href: '#' },
    //    { text: 'Social Impact', href: '#' },
    // { text: 'Shop', href: '#' },
    //  ],
    //},
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'Slack',
      icon: 'tabler:brand-slack',
      href: SLACK_INVITE_URL,
    },
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: LINKEDIN_URL,
    },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: INSTAGRAM_URL,
    },
    {
      ariaLabel: 'Bluesky',
      icon: 'tabler:brand-bluesky',
      href: BLUESKY_URL,
    },

    //{
    //  ariaLabel: 'Lu.ma',
    //  icon: 'LumaIcon', // This icon is wonky and needs to be fixed
    //  href: 'https://luma.com/bwib',
    //},
    {
      ariaLabel: 'YouTube',
      icon: 'tabler:brand-youtube',
      href: YOUTUBE_URL,
    },
    {
      ariaLabel: 'Github',
      icon: 'tabler:brand-github',
      href: GITHUB_URL,
    },
    {
      ariaLabel: 'X (formerly Twitter)',
      icon: 'tabler:brand-x',
      href: TWITTER_URL,
    },
  ],
  footNote: `Boston Women in Bioinformatics is a nonprofit, tax-exempt charitable organization under Section 501(c)(3) of the Internal Revenue Code. Donations are tax-deductible as allowed by law. Logos were designed by Siobhan Keegan and <a href="https://www.monikamistry.com/creative-design/">Monika Mistry</a>.`,
};
