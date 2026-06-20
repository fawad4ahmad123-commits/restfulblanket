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
  image: string;
  hoverImage?: string;
  title: string;
  price?: string;
  subtitle?: string;
  badge?: string;
  index?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  type?: "product" | "category";
  onAddToCart?: () => void;
}

export interface SliderControls {
  prev: () => void;
  next: () => void;
}