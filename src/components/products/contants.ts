import { Product, ProductInformation } from './types';

export const naturalCozyBlanket: Product = {
  id: 'natural-cozy-weighted-blanket',
  name: 'Natural cozy weighted blanket',
  breadcrumbs: ['Shop', 'Weighted Blankets', 'Natural cozy'],
  badge: 'Best Seller',
  rating: 4.9,
  reviewCount: 1284,
  price: 249,
  compareAtPrice: 289,
  currency: 'kr',
  features: [
    { id: 'f1', text: 'CE class 1 + OEKO-TEX class 1' },
    { id: 'f2', text: 'Rapeseed filling – natural and quiet' },
    { id: 'f3', text: 'Washable 60°C' },
    { id: 'f4', text: 'Deep pressure stimulation' },
  ],
  colors: [
    {
      id: 'soft-beige',
      label: 'Soft Beige',
      hex: '#D9C3A3',
      hexSecondary: '#3F3A36',
    },
    { id: 'cream', label: 'Cream', hex: '#F1EADF' },
    { id: 'charcoal', label: 'Charcoal', hex: '#5B5A57' },
  ],
  weights: [
    { id: '3kg', label: '3 kg', inStock: true },
    { id: '7kg', label: '7 kg', inStock: true },
    { id: '9kg', label: '9 kg', inStock: true },
    { id: '12kg', label: '12 kg', inStock: true },
  ],
  sizes: [
    { id: '130x200', label: '130 × 200 cm', inStock: true },
    { id: '150x200', label: '150 × 200 cm', inStock: true },
    { id: '200x220', label: '200 × 220 cm', inStock: false },
  ],
  images: [
    '/images/blanket-1.jpg',
    '/images/blanket-2.jpg',
    '/images/blanket-3.jpg',
    '/images/blanket-4.jpg',
  ],
  infoSections: [
    {
      id: 'why-restful',
      title: 'Why Restfulblanket?',
      body: 'Trusted quality. Made for your well-being. Every blanket is tested for safety and crafted from natural, breathable materials so you fall asleep faster and stay asleep longer.',
    },
  ],
};

export const pearlClassicInfo: ProductInformation = {
  heading: 'PRODUCT',
  headingItalic: 'INFORMATION',
  faqs: [
    {
      id: 'pearl-classic',
      title: 'RestfulBlanket Pearl Classic',
      body: "We recommend selecting a blanket that is approximately 10–12% of your body weight. Use our weight guide above — if you're between sizes, we suggest going with the lighter option for your first blanket. You can always exchange within the 30-night trial.",
    },
    { id: 'every-home', title: 'A product for every home' },
    { id: 'effect', title: 'The effect' },
    { id: 'right-weight', title: 'Choosing the right weight' },
    { id: 'using-weighted-duvet', title: 'Using a weighted duvet' },
    { id: 'safety-quality', title: 'Safety and quality' },
    { id: 'please-note', title: 'Please note!' },
  ],
  detailsTitle: 'DETAILS | Weighted duvets',
  details: [
    { id: 'size', label: 'Size', value: '150 × 210 cm' },
    { id: 'outer-material', label: 'Outer material', value: '100% cotton' },
    {
      id: 'inner-filling',
      label: 'Inner filling',
      value: 'Glass beads, poly wadding',
    },
    { id: 'wash', label: 'Wash', value: 'Machine 60°C' },
    { id: 'article-number', label: 'Article number', value: '150 × 210 cm' },
    { id: 'ean', label: 'EAN / GTIN', value: 'pearl3-wv2' },
    { id: 'outer-material-2', label: 'Outer material', value: '7350013891557' },
  ],
  attributesTitle: 'ATTRIBUTES',
  temperatureLabel: 'Temperature',
  temperatureOptions: [
    { id: 'cool', label: 'Cool', icon: 'cool', active: false },
    { id: 'medium', label: 'Medium', icon: 'medium', active: true },
    { id: 'warm', label: 'Warm', icon: 'warm', active: false },
  ],
};

export const testimonials = [
  {
    id: 1,
    name: 'Client Name 1',
    role: 'Role / Company',
    poster: '/images/testimonial-1-poster.jpg',
    youtubeId: 'jJyBFas91xk', // Video 1
  },
  {
    id: 2,
    name: 'Client Name 2',
    role: 'Role / Company',
    poster: '/images/testimonial-2-poster.jpg',
    youtubeId: 'WyNv_UXCa7U', // Video 2
  },
  {
    id: 3,
    name: 'Client Name 3',
    role: 'Role / Company',
    poster: '/images/testimonial-3-poster.jpg',
    youtubeId: 'MfVXhmhFhAE', // Video 3
  },
];

export const sections = [
  {
    id: 'why-restful',
    title: 'Why Restfulblanket?',
    body: 'Trusted quality. Made for your well-being. Every blanket is tested for safety and crafted from natural, breathable materials so you fall asleep faster and stay asleep longer.',
  },
];
