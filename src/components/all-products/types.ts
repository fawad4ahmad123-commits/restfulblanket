export interface Product {
  id: string;
  name: string;
  category: string;

  image?: string;
  color?: string;

  weight: string;
  dimensions: string;

  price: number;
  originalPrice?: number;
  currency: string;

  rating?: number;
  reviewCount?: number;

  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOnDiscount?: boolean;
  discountPercentage?: number;
}

export interface FilterCategory {
  id: string;
  label: string;
  type: 'category' | 'color' | 'weight' | 'size' | 'price';

  count?: number;

  children?: {
    id: string;
    label: string;
  }[];

  options?: string[];

  colors?: {
    id: string;
    name: string;
    hex: string;
  }[];

  minPrice?: number;
  maxPrice?: number;
}

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export interface SelectedFilters {
  categories: string[];
  colors: string[];
  weights: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
}

export const defaultFilters: SelectedFilters = {
  categories: [],
  colors: [],
  weights: [],
  sizes: [],
  minPrice: 100,
  maxPrice: 550,
};
