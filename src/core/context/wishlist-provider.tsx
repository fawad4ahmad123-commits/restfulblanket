'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  hoverImage?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  color?: string;
  size?: string;
  badge?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistProduct[];
  /** Kept for backward compatibility — list of stored IDs */
  wishlistIds: string[];
  toggleWishlist: (product: WishlistProduct) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = 'wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  // Load from localStorage (handles both old ID-only format and new object format)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (parsed.length === 0 || typeof parsed[0] === 'object') {
            setWishlistItems(parsed as WishlistProduct[]);
          } else {
            // Old format was just IDs — can't recover full data, start fresh
            setWishlistItems([]);
          }
        }
      }
    } catch {
      setWishlistItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product: WishlistProduct) => {
    const normalizedId = String(product.id);
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === normalizedId);
      if (exists) {
        return prev.filter((item) => item.id !== normalizedId);
      }
      return [...prev, { ...product, id: normalizedId }];
    });
  };

  const isWishlisted = (id: string) => {
    return wishlistItems.some((item) => item.id === String(id));
  };

  // Derived list of IDs for backward compatibility
  const wishlistIds = wishlistItems.map((item) => item.id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }

  return context;
}
