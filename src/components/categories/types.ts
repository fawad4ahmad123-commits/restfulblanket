export interface Product {
  id: number;
  slug: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  weight?: string;
  dimensions?: string;
}
export interface Category {
  id: number;
  label: string;
  image: string;
}
