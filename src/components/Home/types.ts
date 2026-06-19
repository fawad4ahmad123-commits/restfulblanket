export interface Product {
  image: string;
  hoverImage?: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
}

export interface BlogCard {
  image: string;
  author: string;
  authorImage: string;
  title: string;
  excerpt: string;
  date: string;
  views: string;
}
