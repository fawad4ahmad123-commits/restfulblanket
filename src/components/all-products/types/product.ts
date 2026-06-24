export interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
}

export interface FilterState {
  category: string[];
  search: string;
}
