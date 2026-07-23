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
                title: 'PTSD',
                href: '/guides/ptsd',
              },
              {
                title: 'Angst',
                href: '/guides/angst',
              },
              {
                title: 'Video Guides',
                href: '/guides/video-guides',
              },
              {
                title: 'Produktfinder',
                href: '/guides/produktfinder-quiz',
              },
            ],
          },
          {
            title: 'Artikler',
            href: '/blog',
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
            children: [
              {
                title: 'Zafir Bæk',
                href: '/ekspertpanel/zafir-baek',
              },
              {
                title: 'Betina Lassen',
                href: '/ekspertpanel/betina-lassen',
              },
              {
                title: 'Silke Enemark',
                href: '/ekspertpanel/silke-enemark',
              },
              {
                title: 'Liselotte Rønne',
                href: '/ekspertpanel/liselotte-roenne',
              },
              {
                title: 'Nina Schiøtz',
                href: '/ekspertpanel/nina-schiotz',
              },
              {
                title: 'Tina Jenny Kjeldsen',
                href: '/ekspertpanel/tina-jenny-kjeldsen',
              },
            ],
          },
          {
            title: 'Projekter',
            href: '/project',
            children: [
              {
                title: 'Lærke',
                href: '/social-projekter/laerke',
              },
              {
                title: 'Medusa',
                href: '/social-projekter/krisecenter',
              },
              {
                title: 'Ro i Indercirklen',
                href: '/social-projekter/ro-i-innercirklen',
              },
              {
                title: 'ESG/CSR-partnere',
                href: '/social-projekter/csr-partnere',
              },
              {
                title: 'Tak til fonde, legatgivere og sponsorer',
                href: '/social-projekter/fonde-og-legatgivere',
              },
            ],
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
            href: '/om-vores-dyner/brugervejledning',
          },
          {
            title: 'Sikkerhed og kontraindikationer',
            href: '/om-vores-dyner/sikkerhed-og-kontraindikationer',
          },
          {
            title: 'CE-Mærkning og Dokumentation',
            href: '/om-vores-dyner/ce-maerkning-og-dokumentation',
          },
          {
            title: 'Forskningsbibliotek og kildesamling',
            href: '/om-vores-dyner/forskningsbibliotek-og-kildesamling',
          },
          {
            title: 'Forskningsoversigt og faglige kilder',
            href: '/om-vores-dyner/forskningsoversigt',
          },
          {
            title: 'Redaktionelle retningslinjer',
            href: '/om-vores-dyner/redaktionelle-retningslinjer',
          },
          {
            title: 'Medicinsk gennemgang og sundhedsfaglig politik',
            href: '/om-vores-dyner/medicinsk-gennemgang-og-sundhedsfaglig-politik',
          },
          {
            title: 'Vask & pleje',
            href: '/om-vores-dyner/vaske-tyngdedyne',
          },
          {
            title: 'Ofte stillede spørgsmål',
            href: '/om-vores-dyner/ofte-stillede-spoergsmaal',
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
    href: '/om-os',
  },
  {
    title: 'Om Socialøkonomi RSV',
    href: '/om-os/restfulblanket-rsv',
  },
  {
    title: 'Om Zafir Bæk',
    href: '/ekspertpanel/zafir-baek',
  },
  {
    title: 'Ekspertpanel',
    href: '/ekspertpanel',
  },
  {
    title: 'FAQs',
    href: '/om-vores-dyner/ofte-stillede-spoergsmaal',
  },
  {
    title: 'RestfulNerd Blog',
    href: '/blog',
  },
  {
    title: 'Foredragsbilletter',
    href: '/collections/foredragsbilletter',
  },
  {
    title: 'Book et Foredrag',
    href: '/book-et-foredrag-restfulblanket',
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
  {
    title: '10% rabat + Sleep guide',
    href: '/sign-up-for-restfulblanket',
  },
];

export const supportLinks = [
  {
    title: 'Guides',
    href: '/guides',
  },
  {
    title: 'Tyngdedyner',
    href: '/collections/sovevaerelse/tyngdedyner/',
  },
  {
    title: 'Vask & pleje',
    href: '/om-vores-dyner/vaske-tyngdedyne',
  },
  {
    title: 'Video Guides',
    href: '/guides/video-guides',
  },
  {
    title: 'Medusa-projektet',
    href: '/social-projekter/krisecenter',
  },
  {
    title: 'Lærke-projektet',
    href: '/social-projekter/laerke',
  },
  {
    title: 'Ro i Indercirklen-projektet',
    href: '/social-projekter/ro-i-innercirklen',
  },
  {
    title: 'FNs Verdensmål',
    href: '/om-os/verdensmaal-baeredygtighed',
  },
  {
    title: 'CE-Mærkning',
    href: '/om-vores-dyner/ce-maerkning-og-dokumentation',
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
    href: '/om-vores-dyner/brugervejledning',
  },
  {
    title: 'Medicinsk gennemgang og sundhedsfaglig politik',
    href: '/om-vores-dyner/medicinsk-gennemgang-og-sundhedsfaglig-politik',
  },
  {
    title: 'Redaktionelle retningslinjer',
    href: '/om-vores-dyner/redaktionelle-retningslinjer',
  },
  {
    title: 'Presse og mediekit',
    href: '/om-os/presse-og-mediekit',
  },
  {
    title: 'Sikkerhed og kontraindikationer',
    href: '/om-vores-dyner/sikkerhed-og-kontraindikationer',
  },
  {
    title: 'Forskningsoversigt og faglige kilder',
    href: '/om-vores-dyner/forskningsoversigt',
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
