import { ArticleData } from './types';

export const ARTICLE_DATA: ArticleData = {
  toc: [
    {
      id: 'body-craves-weight',
      title: 'Why the Body Craves Weight',
    },
    {
      id: 'deep-pressure',
      title: 'What Deep Pressure Stimulation Does',
    },
    {
      id: 'research',
      title: 'What the Research Suggests',
    },
    {
      id: 'choose-weight',
      title: 'Choosing the Right Weight',
    },
    {
      id: 'routine',
      title: 'Making It Part of a Routine',
    },
  ],

  intro: [
    'There is a reason almost every culture has some version of the weighted embrace — a swaddle, a heavy quilt, a hand placed firmly on the back. Long before anyone studied it in a lab, people',
  ],

  sections: [
    {
      id: 'body-craves-weight',
      title: 'Why the Body Craves Weight',
      content: [
        'Occupational therapists have used weighted tools for decades to help calm an overstimulated nervous system, long before weighted blankets became a mainstream sleep product. The principle is simple: firm, distributed pressure across the body mimics the feeling of being held, and the nervous system responds to that signal whether the source is a person, a swaddle, or a blanket.',
        'It is the same instinct behind pulling a duvet tighter during a stressful week, or the immediate sense of relief that comes from a firm hug. The body is reading pressure as a cue, and the cue it prefers, almost universally, is more of it — within reason.',
      ],
    },

    {
      id: 'deep-pressure',
      title: 'What Deep Pressure Stimulation Actually Does',
      content: [
        'This effect has a name: deep pressure stimulation, or DPS. When the body registers steady, even weight, it shifts gently away from a stress response and toward a calmer state. Heart rate tends to settle, breathing slows, and the mind has an easier time letting go of the day.',
      ],
    },

    {
      id: 'research',
      title: 'What the Research Suggests',
      content: [
        'Sleep research on weighted blankets is still a young field, and most studies so far are small. Even so, the direction of the findings has been fairly consistent: people report falling asleep a little faster, waking less often overnight, and feeling calmer in the run-up to bedtime.',
      ],
    },

    {
      id: 'choose-weight',
      title: 'Choosing the Right Weight for You',
      content: [
        'A commonly cited starting point is roughly ten percent of your body weight, give or take a little depending on personal preference and the time of year. Too light, and you may not feel the calming pressure at all; too heavy, and the blanket can feel restrictive rather than reassuring.',
      ],

      list: [
        'Start closer to 10% of body weight.',
        'Lighter blends suit warmer climates.',
        'Heavier fills suit colder months.',
        'Give a new weight at least a week.',
      ],
    },

    {
      id: 'routine',
      title: 'Making It Part of a Routine',
      content: [
        'A weighted blanket works best as one part of a broader wind-down, not a standalone fix. Pairing it with dimmer light, a consistent bedtime, and a short period away from screens tends to produce a much more noticeable effect than the blanket alone.',
        'Used this way, it becomes less of a product and more of a cue — one small, repeatable signal that tells the body the day is done, and its safe to rest.',
      ],
    },
  ],

  quote: {
    text: 'The blanket is not doing anything mystical. It is simply giving the nervous system a clear, steady signal to stand down.',
    author: 'Dr. Maya Lindqvist',
  },

  highlight: {
    title: 'A pattern worth noting',
    content:
      'Across studies available and thousands of reader reports, the most commonly reported change is faster sleep onset.',
  },

  featuredProduct: {
    badge: 'BEST SELLER',
    image: '/product/bestselller.png',
    title: 'Nord Classic Weighted Blanket',
    description: 'Our most-loved blanket, hand-finished with glass-bead fill.',
  },
};

export const ARTICLE_HERO = {
  category: 'SLEEP SCIENCE',

  title: 'The Science Behind Weighted Blankets and Deep Sleep',

  description:
    'A look at deep pressure stimulation — the gentle, evenly distributed weight that calms the nervous system and helps the body settle into longer, steadier rest.',

  author: 'Dr. Maya Lindqvist',

  authorImage: '/blog/blog-avatar.jpg',

  date: '6/03/2026',

  views: '10k Viewers',

  image: '/blog/blogside.png',
};

export const AUTHOR_CARD = {
  quote:
    'Maya studies sleep physiology and has spent the last decade researching non-pharmacological approaches to rest. She advises RestfulBlanket on product design and the science behind our Journal.',
  name: 'Dr. Maya Lindqvist',
  role: 'Sleep Researcher & Wellness Advisor',
  image: '/blog/blog-avatar.jpg',
};

export const COMMENTS = [
  {
    id: 1,
    name: 'Henrik B.',
    date: '2 days ago',
    avatar: '/blog/blog-avatar.jpg',
    comment:
      'I was skeptical until I actually used one for two weeks straight — genuinely sleep deeper now.',
  },
  {
    id: 2,
    name: 'Henrik B.',
    date: '2 days ago',
    avatar: '/blog/blog-avatar.jpg',
    comment:
      'I was skeptical until I actually used one for two weeks straight — genuinely sleep deeper now.',
  },
];

export const BLOG_CATEGORIES = [
  {
    name: 'Hvad er en tyngdedyne?',
    url: '/blog-detail/hvad-er-en-tyngdedyne-forbedre-din-sovn/',
  },
  {
    name: 'Tyngdedyner – valg og typer',
    url: '/collections/sovevaerelse/tyngdedyner/',
  },
  {
    name: 'Tyngdedyne til børn',
    url: '/collections/sovevaerelse/tyngdedyner/boern/',
  },
  {
    name: 'Tyngdedyne til voksne',
    url: '/collections/sovevaerelse/tyngdedyner/voksne/',
  },
  { name: 'Tyngdedyne og ADHD', url: '/blog-detail/adhd/' },
  { name: 'Tyngdedyne mod angst', url: '/blog-detail/angst/' },
  {
    name: 'Kugledyne eller tyngdedyne?',
    url: 'blog-detail/kugledyne-eller-tyngdedyne/',
  },
];
