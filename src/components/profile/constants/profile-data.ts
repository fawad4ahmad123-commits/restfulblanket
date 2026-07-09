import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  UserRound,
  Undo2,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import {
  Address,
  NavItem,
  OverviewStat,
  ProfileUser,
  SleepExpert,
} from '../types/profile';

export const PROFILE_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'account', label: 'Account Information', icon: UserRound },
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
  { id: 'total-orders', label: 'Total orders', value: '7', icon: ShoppingBag },
  { id: 'active-delivery', label: 'Active delivery', value: '2', icon: Truck },
  { id: 'wishlist', label: 'On Wishlist', value: '3', icon: Heart },
  {
    id: 'warranty',
    label: 'Warranty back',
    value: '2 years',
    icon: ShieldCheck,
  },
];

export const SLEEP_EXPERT: SleepExpert = {
  name: 'Zafir Creek',
  title: 'Sleep & comfort curator',
  avatar: 'https://i.pravatar.cc/120?img=13',
  bio: "Do you have any questions about weight, washing, or how to get the most comfort out of your duvet? I'll be happy to answer them personally.",
  email: 'zafir@sleepco.com',
  phone: '+45 22 11 44 55',
};

export const ADDRESSES: Address[] = [
  {
    id: 'addr-billing',
    type: 'billing',
    label: 'Billing Address',
    fullName: 'Maria Jensen',
    street: 'Norrebrogade 88, 2nd floor',
    postalCode: '2200',
    city: 'Copenhagen N',
    country: 'Denmark',
    phone: '+45 22 33 44 55',
  },
  {
    id: 'addr-delivery',
    type: 'delivery',
    label: 'Delivery Address',
    fullName: 'Maria Jensen',
    street: 'Norrebrogade 88, 2nd floor',
    postalCode: '2200',
    city: 'Copenhagen N',
    country: 'Denmark',
    phone: '+45 22 33 44 55',
  },
];
