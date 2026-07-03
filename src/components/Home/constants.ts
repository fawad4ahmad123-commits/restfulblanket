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
    question: 'Naturlige og plastfri materialer',
    answer:
      'Naturlige, plastfri tyngdeprodukter syet i Danmark med renset, polerede og gennemtørrede rapsfrø, som hjælper kroppen og nervesystemet med at finde ro. Produkterne er CE-mærkede som medicinsk udstyr klasse 1, lavet i OEKO-TEX certificeret bomuld og kan vaskes ved 60 °C, så de holder til virkeligt liv.',
  },
  {
    question: 'CE-mærket medicinsk udstyr (Klasse 1)',
    answer:
      'En RestfulBlanket-tyngdedyne er designet til at give stille, jævn sansestimulering, der hjælper med at falde til ro, uden glas eller plast og uden unødig varme. Den kan bruges sammen med din egen dyne eller alene, så du får både rolig tyngde og frihed frem for kompromis.',
  },
  {
    question: 'Udviklet til nervesystemet',
    answer:
      'RestfulBlanket tilbyder også tyngdetæpper, børnemodeller og tilbehør, alle med naturligt rapsfyld og organisk materialer. Produkterne former sig blødt omkring kroppen, giver kølig komfort og er næsten lydløse, så sansestærke personer oplever ro uden plastiklyde.',
  },
  {
    question: 'Dansk produceret, håndsyet kvalitet',
    answer:
      'Naturlig tyngde kan hjælpe, hvis du eller dit barn har angst, stress, uro, ADHD, autisme, PTSD, tankemylder eller generelle søvnproblemer. Tyngden skaber en dyb, jævn stimulering, som kan understøtte ro og hvile sammen med andre strategier som rutiner og terapi.',
  },
  {
    question: 'Vaskbar og praktisk i hverdagen',
    answer:
      'RestfulBlanket fokuserer på at skabe ægte ro for rigtige mennesker, ikke blot tekniske certificeringer. Kunder oplever forbedret søvn, kølig komfort, naturlige materialer uden kvalme varme og en følelse af tryghed, når kroppen får lov at give slip.',
  },
  {
    question: 'Kølig, stille og behagelig tyngde',
    answer:
      'Produkter fra RestfulBlanket er håndsyet med omhu og naturlige materialer, samtidig med at de er praktiske i hverdagen, fordi de kan vaskes ved 60 °C og tørretumbles uden at miste form eller funktion.',
  },
  {
    question: 'Socialøkonomisk virksomhed',
    answer:
      'Et alternativ til traditionelle tyngdedyner med glas- eller plastkugler, som kan være varme, knitre og svære at vaske. RestfulBlanket bruger naturligt rapsfyld, som er køligere, stille og bedre egnet til følsomme sanser uden plastik i fyldet.',
  },
  {
    question: 'Bredt udvalg til forskellige behov',
    answer:
      'Når du vælger et produkt fra RestfulBlanket, får du både en naturlig løsning og støtte til kroppen, samtidig med at du støtter en socialøkonomisk virksomhed, der skaber meningsfulde job og arbejder med ro og omsorg i hele produktionen.',
  },
];
