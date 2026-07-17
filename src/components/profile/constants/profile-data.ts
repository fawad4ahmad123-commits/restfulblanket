import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  UserRound,
  Undo2,
  ShieldCheck,
} from 'lucide-react';
import { NavItem, OverviewStat, ProfileUser } from '../types/profile';

export const PROFILE_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Oversigt', icon: LayoutGrid },
  { id: 'orders', label: 'Mine ordrer', icon: Package },
  { id: 'wishlist', label: 'Ønskeliste', icon: Heart },
  { id: 'addresses', label: 'Adresser', icon: MapPin },
  { id: 'account', label: 'Kontooplysninger', icon: UserRound },
];
export const PROFILE_FOOTER_NAV_ITEM: NavItem = {
  id: 'cancellation',
  label: 'Cancellation & return',
  icon: Undo2,
};

export const PROFILE_USER: ProfileUser = {
  firstName: 'Zaki',
  lastName: 'Rehman',
  email: 'contact@gmail.com',
  phone: '+45 22 33 44 55',
  duvetSize: '140x200 cm Standard weighted duvet',
  nightsOwned: 214,
};

export const OVERVIEW_STATS: OverviewStat[] = [
  {
    id: 'warranty',
    label: 'Garanti',
    value: '2 år',
    icon: ShieldCheck,
  },
];

export const EXPERTS = [
  {
    image: '/experts/expert_1.jpg',
    role: 'SPECIALLÆGE I ALMEN MEDICIN',
    name: 'Liselotte Rønne',
    position: 'Medicinsk Rådgiver & Faglig Reviewer',
    profession: 'Læge',
    specialization: 'Almen Medicin, Søvn og Sundhed',
    tags: [
      'Søvnløshed',
      'Traumeinformeret Regulering',
      'Mindfulness-baserede Tilgange',
    ],
    slug: 'liselotte-roenne',
  },
  {
    image: '/experts/nina-schioetz-psykoterapeut-tyngdedyne-terapi.jpg',
    role: 'AUTORISERET PSYKOTERAPEUT',
    name: 'Nina Schiøtz',
    position: 'Medlem af Ekspertpanelet',
    profession: 'Psykoterapeut',
    specialization: 'Traumer, Angst og Nervesystemregulering',
    tags: ['Stress og Angst', 'Traumeterapi', 'Regulering af Nervesystemet'],
    slug: 'nina-schiotz',
  },
  {
    image: '/experts/Tina-Jenny-Kjeldsen3.webp',
    role: 'DEMENSKONSULENT & VISO-SPECIALIST',
    name: 'Tina Jenny Kjeldsen',
    position: 'Medlem af Ekspertpanelet',
    profession: 'Demenskonsulent',
    specialization: 'Demens, Kognitive Udfordringer og Sanseregulering',
    tags: ['Demensomsorg', 'Sanseregulering', 'Støtte til Pårørende'],
    slug: 'tina-jenny-kjeldsen',
  },
  {
    image: '/experts/expertavatar.png',
    role: 'ERGOTERAPEUT, NEUROSPECIALIST & VISO-SPECIALIST',
    name: 'Betina Lassen',
    position: 'Faglig Sparringspartner & Reviewer',
    profession: 'Ergoterapeut',
    specialization:
      'Sanseregulering, Neurodivergens, Psykiatri og Kognitive Udfordringer',
    tags: [
      'Sanseregulering',
      'Neurodivergens',
      'ADHD & Autisme',
      'Psykiatri',
      'Kognition',
    ],
    slug: 'betina-lassen',
  },
  {
    image: '/experts/Silke-Enar.png',
    role: 'KONSULENT & PEER-KOORDINATOR',
    name: 'Silke Ena',
    position: 'Medlem af Ekspertpanelet',
    profession: 'Konsulent & Peer-Koordinator',
    specialization:
      'ADHD, Autisme, Neurodivergens, Skolevægring og Sanseregulering',
    tags: [
      'ADHD',
      'Autisme',
      'Neurodivergens',
      'Skolevægring',
      'Sanseregulering',
    ],
    slug: 'silke-ena',
  },
  {
    image: '/experts/om-zafir.webp',
    role: 'STIFTER & LEDER AF EKSPERTPANELET',
    name: 'Zafir Bæk',
    position: 'Stifter, Ekspertpanelleder & Faglig Koordinator',
    profession: 'Socialøkonomisk Iværksætter & Søvnrådgiver',
    specialization:
      'Søvn, ADHD, Angst, PTSD, Nervesystemregulering og Tyngdeprodukter',
    tags: [
      'Søvnproblemer',
      'ADHD',
      'Traumer',
      'Angst',
      'Nervesystemregulering',
    ],
    slug: 'zafir-baek',
  },
];
