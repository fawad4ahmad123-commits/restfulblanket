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
    title: 'Tyngdedyner',
    href: '/collections/tyngdedyner',
    groups: [
      {
        heading: 'VORES TYNGDEDYNER',
        links: [
          {
            title: 'Voksne',
            href: '/collections/tyngdedyner/voksne',
          },
          {
            title: 'Børn',
            href: '/collections/tyngdedyner/boern',
          },
        ],
      },
    ],
  },
  {
    title: 'Tyngdetæpper',
    href: '/collections/tyngdetaepper',
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
            href: '/collections/tilbehoer/hovedpuder',
          },
          {
            title: 'Sengesæt',
            href: '/collections/tilbehoer/sengesaet',
          },
        ],
      },
    ],
  },
  {
    title: 'Søvn og ro',
    href: '/soevn-og-ro',
    groups: [
      {
        heading: 'SØVN OG RO',
        links: [
          {
            title: 'Guides',
            href: '/guides',
            children: [
              {
                title: 'ADHD',
                href: '/guides/adhd',
              },
              {
                title: 'Søvn',
                href: '/guides/soevn',
              },
              {
                title: 'Stress',
                href: '/guides/stress',
              },
              {
                title: 'Angst',
                href: '/guides/angst',
              },
            ],
          },
          {
            title: 'Artikler',
            href: '/blog',
            children: [
              {
                title: 'Seneste Artikler',
                href: '/blog',
              },
              {
                title: 'Søvn Artikler',
                href: '/blog/soevn',
              },
              {
                title: 'ADHD Artikler',
                href: '/blog/adhd',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Om Os',
    href: '/about',
    groups: [
      {
        heading: 'OM OS',
        links: [
          {
            title: 'Om Socialøkonomi (RSV)',
            href: '/about/restfulblanket-rsv',
          },
          {
            title: 'Ekspertpanel',
            href: '/expert',
          },
          {
            title: 'Projekter',
            href: '/project',
          },
          {
            title: 'Anmeldelser',
            href: '/about/anmeldelser',
          },
          {
            title: 'Presse og mediekit',
            href: '/about/presse-og-mediekit',
          },
          {
            title: 'Verdensmål og bæredygtighed',
            href: '/about/verdensmaal-baeredygtighed',
          },
        ],
      },
    ],
  },
  {
    title: 'Om vores dyner',
    href: '/om-vores-dyner',
    groups: [
      {
        heading: 'OM VORES DYNER',
        links: [
          {
            title: 'Brugervejledning',
            href: '/guides/brugervejledning',
          },
          {
            title: 'Sikkerhed og kontraindikationer',
            href: '/guides/sikkerhed-og-kontraindikationer',
          },
          {
            title: 'CE-Mærkning og Dokumentation',
            href: '/guides/ce-maerkning',
          },
          {
            title: 'Forskningsbibliotek og kildesamling',
            href: '/guides/forskningsbibliotek',
          },
          {
            title: 'Forskningsoversigt og faglige kilder',
            href: '/guides/forskningsoversigt',
          },
          {
            title: 'Redaktionelle retningslinjer',
            href: '/guides/redaktionelle-retningslinjer',
          },
          {
            title: 'Medicinsk gennemgang og sundhedsfaglig politik',
            href: '/guides/medicinsk-gennemgang',
          },
          {
            title: 'Vask & pleje',
            href: '/guides/vask-pleje',
          },
          {
            title: 'Ofte stillede spørgsmål',
            href: '/guides/faq',
          },
        ],
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
