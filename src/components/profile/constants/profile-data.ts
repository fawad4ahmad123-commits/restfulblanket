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
  Order,
  OverviewStat,
  ProfileUser,
  SleepExpert,
  WishlistItem,
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

export const ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#RFB-10482',
    date: 'June 24, 2026',
    productName: 'Bedding set soft, 3-sided zipper',
    productSubtitle: 'SlumringsRo',
    image:
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80',
    price: 300.99,
    currency: '€',
    status: 'on-the-way',
  },
  {
    id: 'ord-2',
    orderNumber: '#RFB-10482',
    date: 'June 24, 2026',
    productName: 'Bedding set soft, 3-sided zipper',
    productSubtitle: 'SlumringsRo',
    image:
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=200&q=80',
    price: 28.99,
    currency: '€',
    status: 'delivered',
  },
  {
    id: 'ord-3',
    orderNumber: '#RFB-10482',
    date: 'June 24, 2026',
    productName: 'Bedding set soft, 3-sided zipper',
    productSubtitle: 'SlumringsRo',
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&q=80',
    price: 28.99,
    currency: '€',
    status: 'delivered',
  },
  {
    id: 'ord-4',
    orderNumber: '#RFB-10482',
    date: 'June 24, 2026',
    productName: 'Bedding set soft, 3-sided zipper',
    productSubtitle: 'SlumringsRo',
    image:
      'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=200&q=80',
    price: 28.99,
    currency: '€',
    status: 'regretted',
  },
];

export const WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 'wish-1',
    name: 'Nord Classic Weighted Blanket',
    dimensions: '6 kg / 150 x 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.8,
    reviewCount: 1256,
    image:
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80',
    bestSeller: true,
  },
  {
    id: 'wish-2',
    name: 'Nord Classic Weighted Blanket',
    dimensions: '8 kg / 150 x 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.7,
    reviewCount: 1284,
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
    bestSeller: true,
  },
  {
    id: 'wish-3',
    name: 'Nord Classic Weighted Blanket',
    dimensions: '9.4 kg / 200 x 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.9,
    reviewCount: 1284,
    image:
      'https://images.unsplash.com/photo-1509726360864-cf6cc84931f4?w=400&q=80',
    bestSeller: true,
  },
];

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
