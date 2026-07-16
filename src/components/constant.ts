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
    href: '/collections/tyngdetaepper',
    groups: [
      {
        heading: 'VORES TYNGDETÆPPER',
        links: [
          {
            title: 'Voksne',
            href: '/voksne',
          },
          {
            title: 'Børn',
            href: '/boern',
          },
        ],
      },
    ],
  },
  {
    title: 'Tyngdedyner',
    href: '/collections/tyngdedyner',
  },
  {
    title: 'Tilbehør',
    href: '/collections/tilbehoer',
    groups: [
      {
        heading: 'VORES TILBEHØR',
        links: [
          {
            title: 'Hovedpuder',
            href: '/hovedpuder',
          },
          {
            title: 'Sengesæt',
            href: '/sengesaet',
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
  {
    title: 'Guides',
    href: '/guides',
    groups: [
      {
        heading: 'Guides',
        links: [
          { title: 'ADHD', href: '/guides/adhd' },
          { title: 'Sleep', href: '/guides/soevn' },
          { title: 'PTSD', href: '/guides/ptsd' },
          { title: 'Anxiety', href: '/guides/angst' },
          { title: 'Video Guides', href: '/video-guides' },
          { title: 'Product finder', href: '/product-finder' },
        ],
      },
      {
        heading: 'Articles',
        links: [{ title: 'Articles', href: '/blog' }],
      },
    ],
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
    image: '/home/imagehero1.webp',
    title: 'Tyngdedyner',
    description:
      'RestfulBlanket designer og producere tyngdedyner i naturlig OEKO-TEX bomuld i Odsherred, Danmark.',
  },
  {
    image: '/home/hero-img.webp',
    title: 'Naturlig Tyngdetæpper',
    description:
      'RestfulBlanket designer og producerer Tyngdetæpper i naturlig OEKO-TEX bomuld i Odsherred, Danmark.',
  },
];

export const BOTTOM_BANNER_ITEMS = [
  'CE-kl. 1 + OEKO-TEX kl. 1',
  'Vaskbar 60 °C',
  'Rapsfyld – naturligt og stille',
  '90 Nætters Tryghed',
  'Håndsyet i Danmark',
];
