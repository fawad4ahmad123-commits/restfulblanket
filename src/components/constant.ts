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
    groups: [
      {
        heading: 'om-os',
        links: [
          {
            title: 'About Social Economics (RSV)',
            href: '/about/restfulblanket-rsv',
          },
          { title: 'Projects', href: '/project' },
          { title: 'Press and media kit', href: '/about/presse-og-mediekit' },
          {
            title: 'Global Goals and Sustainability',
            href: '/about/verdensmaal-baeredygtighed',
          },
        ],
      },
    ],
  },
  {
    title: 'Projekter',
    href: '/project',
    groups: [
      {
        heading: 'projects',
        links: [
          {
            title: 'Lærke',
            href: '/project/laerke',
          },
          // {
          //   title: 'Medusa',
          //   href: '/project/krisecenter',
          // },
          {
            title: 'Ro i Indercirklen',
            href: '/project/ro-i-innercirklen',
          },
          // {
          //   title: 'ESG/CSR-partnere',
          //   href: '/project/csr-partnere',
          // },
          {
            title: 'Tak til fonde, legatgivere og sponsorer',
            href: '/project/fonde-og-legatgivere',
          },
        ],
      },
    ],
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
          { title: 'Video Guides', href: '/guides/video-guides' },
          { title: 'Product finder', href: '/guides/product-finder' },
        ],
      },
      {
        heading: 'Articles',
        links: [{ title: 'Articles', href: '/blog' }],
      },
    ],
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];

export const shopLinks = [
  {
    title: 'Alle Produkter',
    href: '/shop',
  },
  {
    title: 'Tyngdedyner',
    href: '/tyngdedyner',
  },
  {
    title: 'Om RestfulBlanket',
    href: '/om-restfulblanket',
  },
  {
    title: 'Om Socialøkonomi RSV',
    href: '/om-socialokonomi-rsv',
  },
  {
    title: 'Om Zafir Bæk',
    href: '/om-zafir-baek',
  },
  {
    title: 'Ekspertpanel',
    href: '/ekspertpanel',
  },
  {
    title: 'FAQs',
    href: '/faqs',
  },
  {
    title: 'RestfulNerd Blog',
    href: '/blog',
  },
  {
    title: 'Foredragsbilletter',
    href: '/foredragsbilletter',
  },
  {
    title: 'Book et Foredrag',
    href: '/book-et-foredrag',
  },
  {
    title: 'ESG/CSR',
    href: '/esg-csr',
  },
  {
    title: 'Tak til Fond og Sponsor',
    href: '/tak-til-fond-og-sponsor',
  },
  {
    title: 'Lån en tyngdedyne',
    href: '/laan-en-tyngdedyne',
  },
];

export const supportLinks = [
  {
    title: 'Guides',
    href: '/guides',
  },
  {
    title: 'Tyngdedyner',
    href: '/collections/tyngdedyner',
  },
  {
    title: 'Vask & pleje',
    href: '/guides/vask-pleje',
  },
  {
    title: 'Video Guides',
    href: '/guides/video-guides',
  },
  {
    title: 'Medusa-projektet',
    href: '/project/medusa-projektet',
  },
  {
    title: 'Lærke-projektet',
    href: '/project/laerke-projektet',
  },
  {
    title: 'Ro i Indercirklen-projektet',
    href: '/project/ro-i-indercirklen-projektet',
  },
  {
    title: 'FNs Verdensmål',
    href: '/guides/fns-verdensmaal',
  },
  {
    title: 'CE-Mærkning',
    href: '/guides/ce-maerkning',
  },
  {
    title: 'Privatlivspolitik',
    href: '/privatlivspolitik',
  },
  {
    title: 'Handelsbetingelser',
    href: '/handelsbetingelser',
  },
  {
    title: 'Brugervejledning',
    href: '/brugervejledning',
  },
  {
    title: 'Medicinsk gennemgang og sundhedsfaglig politik',
    href: '/medicinsk-gennemgang-og-sundhedsfaglig-politik',
  },
  {
    title: 'Redaktionelle retningslinjer',
    href: '/redaktionelle-retningslinjer',
  },
  {
    title: 'Presse og mediekit',
    href: '/presse-og-mediekit',
  },
  {
    title: 'Sikkerhed og kontraindikationer',
    href: '/sikkerhed-og-kontraindikationer',
  },
  {
    title: 'Forskningsoversigt og faglige kilder',
    href: '/forskningsoversigt-og-faglige-kilder',
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
