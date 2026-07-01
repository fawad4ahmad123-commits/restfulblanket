import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const PLACEHOLDER_IMAGE = '/placeholder-image.png';

export const navigation = [
  {
    title: 'All Products',
    href: '/shop',
  },
  {
    title: 'Tyngdedyner',
    href: '/weighted-blankets',
    groups: [
      {
        heading: 'VORES TYNGDEDYNER',
        links: [
          { title: 'Tyngdetæpper', href: '/weighted-blankets/blankets' },
          { title: 'Tilbehør', href: '/weighted-blankets/accessories' },
        ],
      },
      {
        heading: 'NYTTIG INFORMATION',
        links: [
          { title: 'Vælg den rigtige', href: '/weighted-blankets/guide' },
          {
            title: 'Materialer og dokumentation',
            href: '/weighted-blankets/materials',
          },
          {
            title: 'For professionelle',
            href: '/weighted-blankets/professionals',
          },
        ],
      },
    ],
    products: [
      {
        title: 'Pearl Classic',
        price: '€79',
        image: '/products/pearl-classic.jpg',
        href: '/products/pearl-classic',
      },
      {
        title: 'Pearl Cotton Eco',
        price: '€89',
        image: '/products/pearl-cotton-eco.jpg',
        href: '/products/pearl-cotton-eco',
      },
      {
        title: 'Pearl Lyocell',
        price: '€151.20',
        image: '/products/pearl-lyocell.jpg',
        href: '/products/pearl-lyocell',
      },
      {
        title: 'ProCare Pearl',
        price: '€99.50',
        image: '/products/procare-pearl.jpg',
        href: '/products/procare-pearl',
      },
    ],
  },
  {
    title: 'Tilbehør',
    href: '/accessories',
  },
  {
    title: 'Søvn & Ro',
    href: '/sleep',
  },
  {
    title: 'Om Os',
    href: '/about',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];

export const slides = [
  {
    image: '/home/hero-img.jpg',
    title: 'Sleep Better.',
    subtitle: 'Live Better.',
    description:
      'Hand-crafted weighted blankets and duvets, shaped by Nordic calm.',
  },
  {
    image: '/home/hero-img-2.jpg',
    title: 'Feel Calm.',
    subtitle: 'Every Night.',
    description:
      'Designed to reduce stress and help you drift into deeper sleep.',
  },
  {
    image: '/home/hero-img-3.jpg',
    title: 'Wake Refreshed.',
    subtitle: 'Every Morning.',
    description: 'Premium bedding inspired by Scandinavian simplicity.',
  },
];

export const shopLinks = [
  'Adult Weighted Blankets',
  'Kids Weighted Blankets',
  'Premium Duvets',
  'Sleep Accessories',
  'Gift Cards',
];

export const supportLinks = [
  'About Us',
  'Help Center',
  'Sleep Trial',
  'Shipping & Returns',
  'Care Guide',
  'Contact',
];

export const socialLinks = [
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/restfulblanket/',
    name: 'Instagram',
  },
  {
    icon: FaFacebookF,
    href: 'https://www.facebook.com/restfulblanket/',
    name: 'Facebook',
  },
  {
    icon: FaTiktok,
    href: 'https://www.tiktok.com/@restfulblanket',
    name: 'TikTok',
  },
  {
    icon: FaXTwitter,
    href: 'https://x.com/RestfulBlanket',
    name: 'X (Twitter)',
  },
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/@RestfulBlanketDK',
    name: 'YouTube',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/106909912/',
    name: 'LinkedIn',
  },
];

export const HERO_SLIDES = [
  {
    image: '/home/hero-img.jpg',
    title: 'Sleep Better.',
    subtitle: 'Live Better.',
    description:
      'Hand-crafted weighted blankets and duvets, shaped by Nordic calm. Designed in Stockholm to ease anxious nights and gently hold you into deeper rest.',
  },
  {
    image: '/home/hero-img.jpg',
    title: 'Feel Calm.',
    subtitle: 'Every Night.',
    description:
      'Premium weighted bedding created to reduce stress and help you fall asleep faster.',
  },
  {
    image: '/home/hero-img.jpg',
    title: 'Wake Refreshed.',
    subtitle: 'Every Morning.',
    description:
      'Experience Scandinavian comfort designed for deeper sleep and brighter mornings.',
  },
];

export const BOTTIM_BANNER_ITEMS = [
  '30-NIGHT SLEEP TRIAL, NO QUESTIONS ASKED',
  'HAND-FINISHED IN SMÅLAND, SWEDEN',
  'OEKO-TEX & CE CERTIFIED',
  'FREE CARBON-NEUTRAL SHIPPING OVER €120',
];
