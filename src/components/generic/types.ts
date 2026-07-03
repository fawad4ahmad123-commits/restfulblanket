export interface Product {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
}

export interface SliderCard {
  id: number | string;
  slug: string;
  image: string;
  title: string;
  price: string | number;
  originalPrice?: string | number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  weight?: string;
  dimensions?: string;
  color?: string;
  size?: string;
  type: string;
  isProduct: boolean;
}

export interface SliderControls {
  prev: () => void;
  next: () => void;
}
