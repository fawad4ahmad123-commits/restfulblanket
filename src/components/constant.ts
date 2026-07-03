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
    title: 'Alle Produkter',
    href: '/shop',
  },
  {
    title: 'Tyngdetæpper',
    href: '/categories',
    groups: [
      {
        heading: 'VORES TYNGDETÆPPER',
        links: [
          {
            title: 'Voksne',
            href: '/categories',
          },
          {
            title: 'Børn',
            href: '/categories',
          },
        ],
      },
    ],
  },
  {
    title: 'Tyngdetæppe',
    href: '/categories',
  },
  {
    title: 'Tilbehør',
    href: '/categories',
    groups: [
      {
        heading: 'VORES TILBEHØR',
        links: [
          {
            title: 'Hovedpuder',
            href: '/categories',
          },
          {
            title: 'Sengesæt',
            href: '/categories',
          },
        ],
      },
    ],
  },
  {
    title: 'Eksperter',
    href: '/expert',
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
  {
    title: 'Alle Produkter',
    href: '/shop',
  },
  {
    title: 'Voksne Tyngdetæpper',
    href: '/categories',
  },
  {
    title: 'Eksperter',
    href: '/expert',
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

export const supportLinks = [
  {
    title: 'Om Os',
    href: '/about',
  },
  {
    title: 'Kontakt',
    href: '/contact',
  },
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
    image: '/home/heroimage22.jpg',
    title: 'Tyngdedyner',
    description:
      'RestfulBlanket designer og producere tyngdedyner i naturlig OEKO-TEX bomuld i Odsherred, Danmark.',
  },
  {
    image: '/home/hero-img.jpg',
    title: 'Naturlig Tyngdetæpper',
    description:
      'RestfulBlanket designer og producerer Tyngdetæpper i naturlig OEKO-TEX bomuld i Odsherred, Danmark.',
  },
];

export const BOTTOM_BANNER_ITEMS = [
  '30 DAGES SØVNPRØVE – INGEN SPØRGSMÅL STILLET',
  'HÅNDLAVET I SMÅLAND, SVERIGE',
  'OEKO-TEX®- OG CE-CERTIFICERET',
  'GRATIS KLIMANEUTRAL LEVERING OVER €120',
];
