// types.ts
export interface CartItem {
  id: string; // Unique ID: "10171-Blå Creme-3kg-140×200×5cm"
  productId?: number; // The actual product ID: 10171
  variationId?: number; // The variation ID if applicable
  name: string;
  color?: string; // For backward compatibility
  variant?: string; // For backward compatibility (size)
  weight?: string; // For backward compatibility
  price: number;
  quantity: number;
  image: string;
  attributes?: {
    color: string;
    size: string;
    weight: string;
  };
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
