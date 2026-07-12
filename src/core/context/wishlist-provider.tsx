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
  wishlistIds: string[];
  toggleWishlist: (product: WishlistProduct) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
  saveWishlistToServer: (token: string) => Promise<any>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = 'wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) return;

      if (parsed.length === 0) {
        setWishlistItems([]);
        return;
      }

      if (typeof parsed[0] === 'object') {
        setWishlistItems(parsed);
      }
    } catch (error) {
      console.error('Wishlist load error:', error);
      setWishlistItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Wishlist save error:', error);
    }
  }, [wishlistItems]);

  const toggleWishlist = (product: WishlistProduct) => {
    const normalizedId = String(product.id);

    setWishlistItems((prev) => {
      const exists = prev.some((item) => String(item.id) === normalizedId);

      if (exists) {
        return prev.filter((item) => String(item.id) !== normalizedId);
      }

      return [
        ...prev,
        {
          ...product,
          id: normalizedId,
        },
      ];
    });
  };

  const isWishlisted = (id: string) => {
    return wishlistItems.some((item) => String(item.id) === String(id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const saveWishlistToServer = async (token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/headless/v1/wishlist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: wishlistItems,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Failed to save wishlist');
    }

    return data;
  };

  const wishlistIds = wishlistItems.map((item) => String(item.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        saveWishlistToServer,
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
