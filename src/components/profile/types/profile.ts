import type { LucideIcon } from 'lucide-react';

export type ProfileSectionId =
  | 'overview'
  | 'orders'
  | 'wishlist'
  | 'addresses'
  | 'account'
  | 'cancellation';

export interface NavItem {
  id: ProfileSectionId;
  label: string;
  italicPart?: string;
  icon: LucideIcon;
  url?: string;
}

export type OrderStatus = 'on-the-way' | 'delivered' | 'regretted';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  productName: string;
  productSubtitle: string;
  image: string;
  price: number;
  currency: string;
  status: OrderStatus;
}

export interface WishlistItem {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  bestSeller?: boolean;
}

export interface Address {
  id: string;
  type: 'billing' | 'delivery';
  label: string;
  fullName: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

export interface SleepExpert {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  email: string;
  phone: string;
}

export interface OverviewStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  duvetSize: string;
  nightsOwned: number;
}
