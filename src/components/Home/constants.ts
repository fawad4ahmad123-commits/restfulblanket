import { Product } from './types';

export const BESTSELLERPRODUCT: Product[] = [
  {
    image: '/products/blanket-1.jpg',
    title: 'Nord Classic Weighted Blanket',
    price: '€249',
    originalPrice: '€289',
    rating: 4.9,
    reviewCount: 1284,
    weight: '7 kg',
    dimensions: '150 × 200 cm',
  },
  {
    image: '/products/blanket-2.jpg',
    title: 'Nord Premium Blanket',
    price: '€269',
    originalPrice: '€309',
    rating: 4.8,
    reviewCount: 964,
    weight: '9 kg',
    dimensions: '150 × 200 cm',
  },
  {
    image: '/products/blanket-3.jpg',
    title: 'Nord Kids Blanket',
    price: '€189',
    originalPrice: '€229',
    rating: 4.9,
    reviewCount: 741,
    weight: '5 kg',
    dimensions: '120 × 180 cm',
  },
  {
    image: '/products/blanket-4.jpg',
    title: 'Nord Luxury Blanket',
    price: '€299',
    originalPrice: '€349',
    rating: 5,
    reviewCount: 512,
    weight: '12 kg',
    dimensions: '200 × 220 cm',
  },
];

export const CATEGORIES = ['All', 'Adult', 'Kids', 'Duvets', 'Accessories'];

export const REVIEWS = [
  {
    id: 1,
    name: 'Elin Bergström',
    location: 'Stockholm, Sweden',
    rating: 5,
    review:
      "I haven't slept this deeply since I was a child. The Nord Classic feels like a hug that lasts all night — my anxiety mornings are simply gone.",
  },
  {
    id: 2,
    name: 'Marcus Holm',
    location: 'Gothenburg, Sweden',
    rating: 5,
    review:
      "I haven't slept this deeply since I was a child. The Nord Classic feels like a hug that lasts all night — my anxiety mornings are simply gone.",
  },
  {
    id: 3,
    name: 'Sofia Lindqvist',
    location: 'Copenhagen, Denmark',
    rating: 5,
    review:
      "We bought the Stilla Kids for our daughter and she now asks for her 'cloud' every night. Bedtime tantrums went from nightly to almost never.",
  },
  {
    id: 4,
    name: 'Anna Karlsson',
    location: 'Oslo, Norway',
    rating: 5,
    review:
      "The quality is exceptional. I've tried other weighted blankets before but nothing compares to the craftsmanship of RestfulBlanket.",
  },
  {
    id: 5,
    name: 'Lars Eriksson',
    location: 'Helsinki, Finland',
    rating: 5,
    review:
      'Finally sleeping through the night after years of insomnia. This blanket has genuinely changed my life. Worth every penny.',
  },
];

export const EXPERTS: any = [
  {
    image: '/experts/1.png',
    role: 'SLEEP THERAPIST',
    name: 'Dr. Sarah Mitchell',
    position: 'Lead Consultant',
    tags: ['Weighted Therapy', 'Anxiety Relief', 'Pediatrics'],
  },
  {
    image: '/experts/1.png',
    role: 'ERGOTHERAPIST',
    name: 'Lars Eriksen',
    position: 'Senior Consultant',
    tags: ['Sensory Integration', 'Chronic Stress', 'Adults'],
  },
  {
    image: '/experts/1.png',
    role: 'SLEEP RESEARCHER',
    name: 'Dr. Anna Lindgren',
    position: 'Research Advisor',
    tags: ['Neuroscience', 'Deep Sleep', 'Research'],
  },
  {
    image: '/experts/1.png',
    role: 'SLEEP THERAPIST',
    name: 'Dr. Sarah Mitchell',
    position: 'Lead Consultant',
    tags: ['Weighted Therapy', 'Anxiety Relief', 'Pediatrics'],
  },
];

export const BLOGS = [
  {
    image: '/blog/1.png',
    author: 'Ronald Richards',
    authorImage: 'https://i.pravatar.cc/100?img=1',
    title: 'How Weighted Blankets Improve Sleep Quality',
    excerpt:
      'Discover how gentle, evenly distributed pressure helps calm the nervous system, reduce stress, and improve sleep.',
    date: '6/13/2026',
    views: '10k Viewers',
  },
  {
    image: '/blog/1.png',
    author: 'Ronald Richards',
    authorImage: 'https://i.pravatar.cc/100?img=2',
    title: 'How Weighted Blankets Improve Sleep Quality',
    excerpt:
      'Discover how gentle, evenly distributed pressure helps calm the nervous system, reduce stress, and improve sleep.',
    date: '6/13/2026',
    views: '10k Viewers',
  },
  {
    image: '/blog/1.png',
    author: 'Ronald Richards',
    authorImage: 'https://i.pravatar.cc/100?img=3',
    title: 'How Weighted Blankets Improve Sleep Quality',
    excerpt:
      'Discover how gentle, evenly distributed pressure helps calm the nervous system, reduce stress, and improve sleep.',
    date: '6/13/2026',
    views: '10k Viewers',
  },
  {
    image: '/blog/1.png',
    author: 'Ronald Richards',
    authorImage: 'https://i.pravatar.cc/100?img=4',
    title: 'How Weighted Blankets Improve Sleep Quality',
    excerpt:
      'Discover how gentle, evenly distributed pressure helps calm the nervous system, reduce stress, and improve sleep.',
    date: '6/13/2026',
    views: '10k Viewers',
  },
];

export const FAQS = [
  {
    question: 'How do I choose the right weight?',
    answer:
      "We recommend selecting a blanket that is approximately 10–12% of your body weight. Use our weight guide above — if you're between sizes, we suggest going with the lighter option for your first blanket. You can always exchange within the 30-night trial.",
  },
  {
    question: 'Is the Nord Classic suitable for hot sleepers?',
    answer:
      'Yes! The Nord Classic uses breathable natural materials that regulate temperature throughout the night, making it a great option for hot sleepers. Many customers report sleeping cooler with the weighted blanket than with a standard duvet.',
  },
  {
    question: 'Can I use the weighted blanket with a duvet cover?',
    answer:
      'Absolutely. Our blankets are designed to fit standard duvet covers. We also offer our own range of covers made from the same breathable materials, sized specifically for each blanket weight.',
  },
  {
    question: 'How do I clean the blanket?',
    answer:
      'All Nord Classic blankets are machine washable on a gentle cycle up to 30°C. We recommend using a large-capacity machine (at least 8 kg) for even cleaning. Tumble dry on low or lay flat to air dry.',
  },
  {
    question: 'What is your return policy?',
    answer:
      "We offer a 30-night trial on all blankets. If you're not completely satisfied, contact our team and we'll arrange a free collection and full refund — no questions asked.",
  },
];
