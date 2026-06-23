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
  slug: string;
  price?: string;
  subtitle?: string;
  badge?: string;
  id: number;
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
