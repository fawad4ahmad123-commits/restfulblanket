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
    image: '/experts/expert_1.jpg',
    role: 'SPECIALIST IN GENERAL MEDICINE',
    name: 'Liselotte Rønne',
    position: 'Medical Advisor & Expert Reviewer',
    tags: [
      'Insomnia',
      'Trauma-Informed Regulation',
      'Mindfulness-Based Approaches',
    ],
  },
  {
    image: '/experts/nina-schioetz-psykoterapeut-tyngdedyne-terapi.jpg',
    role: 'REGISTERED PSYCHOTHERAPIST',
    name: 'Nina Schiøtz',
    position: 'Expert Panel Member',
    tags: ['Stress & Anxiety', 'Trauma Therapy', 'Nervous System Regulation'],
  },
  {
    image: '/experts/Tina-Jenny-Kjeldsen3.webp',
    role: 'DEMENTIA CONSULTANT & VISO SPECIALIST',
    name: 'Tina Jenny Kjeldsen',
    position: 'Expert Panel Member',
    tags: ['Dementia Care', 'Sensory Regulation', 'Family Support'],
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
    slug: '',
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
    slug: '',
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
    slug: '',
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
    slug: '',
  },
];

export const FAQS = [
  {
    question: 'Hvordan vælger jeg den rigtige vægt?',
    answer:
      'Vi anbefaler at vælge et tæppe, der vejer cirka 10–12% af din kropsvægt. Brug vores vægtguide ovenfor — hvis du ligger mellem to størrelser, anbefaler vi at vælge den lettere variant til dit første tæppe. Du kan altid bytte inden for vores 30-nætters prøveperiode.',
  },
  {
    question: 'Er Nord Classic egnet til varme sovende?',
    answer:
      'Ja! Nord Classic er lavet af åndbare, naturlige materialer, der regulerer temperaturen hele natten, hvilket gør det til et godt valg for varme sovende. Mange kunder oplever faktisk, at de sover køligere med et vægtet tæppe end med en almindelig dyne.',
  },
  {
    question: 'Kan jeg bruge det vægtede tæppe med et dynebetræk?',
    answer:
      'Absolut. Vores tæpper er designet til at passe til standard dynebetræk. Vi tilbyder også vores egen kollektion af betræk lavet af de samme åndbare materialer, tilpasset hver enkelt tæppevægt.',
  },
  {
    question: 'Hvordan rengør jeg tæppet?',
    answer:
      'Alle Nord Classic tæpper kan maskinvaskes på et skånsomt program op til 30°C. Vi anbefaler at bruge en vaskemaskine med stor kapacitet (mindst 8 kg) for en jævn rengøring. Tørretumbl på lav varme eller lad det lufttørre fladt.',
  },
  {
    question: 'Hvad er jeres returpolitik?',
    answer:
      'Vi tilbyder en 30-nætters prøveperiode på alle tæpper. Hvis du ikke er helt tilfreds, kan du kontakte vores team, så arrangerer vi gratis afhentning og fuld refundering — uden spørgsmål.',
  },
];
