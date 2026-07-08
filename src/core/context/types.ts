export interface CartItem {
  id: string;
  name: string;
  color: string;
  variant: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}
export interface UpsellItem {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: number;
  image: string;
}

export interface CartContextType {
  items: CartItem[];
  upsellItems: UpsellItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;

  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;

  addUpsellToCart: (id: string) => void;
  setUpsellItems: (items: UpsellItem[]) => void;

  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count?: number;
  description?: string;
  image?: any;
}

export interface CategoryContextType {
  categories: Category[];
  parentCategories: Category[];
  products: any[];
  getChildren: (parentId: number) => Category[];
  getProductsByCategory: (categoryId: number | null, limit?: number) => any[];
}
