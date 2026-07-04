import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    label: 'All',
    image: '/categories/category-avatar.jpg',
  },
  {
    id: 2,
    label: 'Adults',
    image: '/categories/category-avatar.jpg',
  },
  {
    id: 3,
    label: 'Kids',
    image: '/categories/category-avatar.jpg',
  },
  {
    id: 4,
    label: 'Cooling',
    image: '/categories/category-avatar.jpg',
  },
  {
    id: 5,
    label: 'Gift sets',
    image: '/categories/category-avatar.jpg',
  },
];

export const CATEGORY_PRODUCT: Product[] = [
  {
    id: 1,
    slug: 'nord-classic-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Classic Weighted Blanket',
    price: 249,
    originalPrice: 289,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 1284,
    weight: '7 kg',
    dimensions: '150 × 200 cm',
  },
  {
    id: 2,
    slug: 'nord-premium-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Premium Weighted Blanket',
    price: 299,
    originalPrice: 349,
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 956,
    weight: '9 kg',
    dimensions: '150 × 200 cm',
  },
  {
    id: 3,
    slug: 'nord-cooling-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Cooling Weighted Blanket',
    price: 279,
    originalPrice: 329,
    badge: 'New',
    rating: 4.9,
    reviewCount: 742,
    weight: '7 kg',
    dimensions: '140 × 200 cm',
  },
  {
    id: 4,
    slug: 'nord-luxury-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Luxury Weighted Blanket',
    price: 349,
    originalPrice: 399,
    badge: 'Best Seller',
    rating: 5,
    reviewCount: 1842,
    weight: '12 kg',
    dimensions: '200 × 220 cm',
  },
  {
    id: 5,
    slug: 'nord-kids-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Kids Weighted Blanket',
    price: 199,
    originalPrice: 229,
    badge: 'Kids',
    rating: 4.8,
    reviewCount: 521,
    weight: '4 kg',
    dimensions: '100 × 150 cm',
  },
  {
    id: 6,
    slug: 'nord-organic-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Organic Weighted Blanket',
    price: 269,
    originalPrice: 319,
    badge: 'Organic',
    rating: 4.9,
    reviewCount: 897,
    weight: '7 kg',
    dimensions: '150 × 200 cm',
  },
  {
    id: 7,
    slug: 'nord-winter-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Winter Weighted Blanket',
    price: 289,
    originalPrice: 339,
    badge: 'Winter',
    rating: 4.7,
    reviewCount: 663,
    weight: '9 kg',
    dimensions: '150 × 200 cm',
  },
  {
    id: 8,
    slug: 'nord-signature-weighted-blanket',
    image: '/product/bestselller.png',
    title: 'Nord Signature Weighted Blanket',
    price: 329,
    originalPrice: 379,
    badge: 'Signature',
    rating: 5,
    reviewCount: 2154,
    weight: '12 kg',
    dimensions: '200 × 220 cm',
  },
];

export const COMPARISON_DATA = [
  {
    feature: 'Fyld',
    restfull: 'Naturlige, varmebehandlede rapsfrø',
    traditional: 'Syntetiske plast- eller glaskugler',
  },
  {
    feature: 'Vaskbarhed',
    restfull: 'Maskinvask ved 60°C',
    traditional: 'Ofte kun 30-40°C eller pletvask',
  },
  {
    feature: 'Støjniveau',
    restfull: 'Fuldstændig lydløs',
    traditional: 'Kan rasle eller knitre ved bevægelse',
  },
  {
    feature: 'Temperatur',
    restfull: 'Åndbar og temperaturregulerende',
    traditional: 'Kan fange kropsvarmen',
  },
  {
    feature: 'Certificering',
    restfull: 'CE-mærket medicinsk udstyr',
    traditional: '	Varierer',
  },
];

export const pageData = {
  faqHeading: 'Ofte stillede spørgsmål',
  faqs: [
    {
      question: 'Er jeres tyngdedyner det samme som kugledyner?',
      answer:
        'Mange søger efter "kugledyne", men vores tyngdedyner er faktisk et naturligt alternativ til traditionelle kugledyner. I stedet for plastikbolde eller glasperler bruger vi varmebehandlede rapsfrø, som giver en blødere, mere krammende følelse uden raslelyde. Du får samme effekt - tyngde og ro - men med naturlige materialer.',
      link: [],
    },
    {
      question: 'Jeg har angst - hvilken vægt passer til mig?',
      answer:
        'Mange mennesker med angst finder, at ekstra tyngde kan være særligt beroligende. Vi anbefaler ofte at starte med en vægt i den øvre ende af dit vægtinterval. Læs mere i vores komplette angst guide.',
      link: [
        {
          label: 'angst guide',
          url: 'https://restfulblanket.dk/guides/angst/',
        },
      ],
    },
    {
      question: 'Jeg har ADHD - er der en særlig vægt til mig?',
      answer:
        'Mennesker med ADHD har ofte brug for mere input til nervesystemet, og mange finder, at lidt ekstra tyngde kan hjælpe med at skabe ro. Start med en vægt i den normale eller øvre ende af dit vægtinterval. Læs mere om, hvordan tyngde kan hjælpe med ADHD, i vores ADHD guide.',
      link: [
        { label: 'ADHD guide', url: 'https://restfulblanket.dk/guides/adhd/' },
      ],
    },
    {
      question: 'Jeg har PTSD - hvad skal jeg vide?',
      answer:
        'Mennesker med PTSD kan ofte have stor gavn af tyngdedynen, da den kan signalere sikkerhed til kroppen. Vi anbefaler at starte med en vægt i den normale til øvre ende af dit vægtinterval. Læs mere om, hvordan tyngde kan understøtte helingsprocessen, i vores PTSD guide.',
      link: [
        { label: 'PTSD guide', url: 'https://restfulblanket.dk/guides/ptsd/' },
      ],
    },
    {
      question: 'Jeg har søvnproblemer - kan hjælpe mig?',
      answer:
        'Ja! Søvn er fundamental for vores helbred, og mange mennesker finder, at en tyngdedyne kan være det sidste puslespil, der mangler. Tyngden hjælper kroppen med at falde til ro og forbedrer søvnkvaliteten ved at skabe dybere, mere vedvarende søvn. Læs mere om, hvordan tyngde kan transformere din søvn, i vores komplette søvn guide.',
      link: [
        { label: 'søvn guide', url: 'https://restfulblanket.dk/guides/soevn/' },
      ],
    },
    {
      question: 'Kan jeg bruge den hele året rundt?',
      answer:
        'Ja! Vores naturlige dyner er fyldt med rapsfrø, der temperaturregulerer naturligt. Om sommeren kan du bruge den alene eller med et let lagen. Om vinteren kan du kombinere den med en vinterdyne. Mange kunder elsker, at de kan bruge den hele året uden at blive for varm.',
      link: [],
    },
    {
      question: 'Hvilken størrelse skal jeg vælge?',
      answer:
        'Vi tilbyder et bredt udvalg af størrelser til hele familien, fra babydyner og juniordyner til standard voksendyner, ekstra lange modeller til høje personer, og dobbeltdyner skræddersyet til par. Klik på Baby, Børn eller Voksen ovenfor for at finde den rigtige størrelse til dit behov.',
      link: [
        {
          label: 'Baby',
          url: 'https://restfulblanket.dk/shop/tyngdedyne-baby-70x100/',
        },
        {
          label: 'Børn',
          url: 'https://restfulblanket.dk/shop/tyngdedyne-boern-100x140/',
        },
        {
          label: 'Voksen',
          url: 'https://restfulblanket.dk/categories/tyngdedyner/voksne/',
        },
      ],
    },
    {
      question: 'Kan jeg vaske dynen?',
      answer:
        'Ja! Alle RestfulBlanket dyner kan vaskes ved 60 grader i din egen maskine og tørretumbles. Det betyder, at du nemt kan holde den ren og hygijenisk, selv med børn, kæledyr og hverdagens udfordringer.',
      link: [],
    },
    {
      question: 'Hvordan ved jeg, om tyngdedynen virker for mig?',
      answer:
        'Nogle mennesker mærker effekten første nat, mens andre skal bruge nogle nætter på at vænne sig til tyngden. Det er normalt, at kroppen skal lære, at det er sikkert at slappe af. Giv det mindst 1-2 uger, før du vurderer effekten. Hvis det føles for intenst, kan du bruge dynen kortere tid ad gangen eller prøve en lidt lavere vægt.',
      link: [],
    },
  ],
};
