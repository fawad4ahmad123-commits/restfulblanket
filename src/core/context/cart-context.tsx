'use client';

import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { CartContextType, CartItem, UpsellItem } from './types';

export const CartContext = createContext<CartContextType | null>(null);

// Helper to generate a unique cart item ID
function generateCartItemId(product: Partial<CartItem>): string {
  const parts = [
    product.productId || product.id,
    product.attributes?.color || '',
    product.attributes?.weight || '',
    product.attributes?.size || product.variant || '',
  ].filter(Boolean);
  return parts.join('-');
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [upsellItems, setUpsellItems] = useState<UpsellItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const setCartOpen = (open: boolean) => setIsOpen(open);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const itemId = product.id || generateCartItemId(product);
      const existing = prev.find((i) => {
        if (i.id !== itemId) return false;
        if (product.attributes && i.attributes) {
          return (
            i.attributes.color === product.attributes.color &&
            i.attributes.size === product.attributes.size &&
            i.attributes.weight === product.attributes.weight
          );
        }
        return (
          i.color === product.color &&
          i.variant === product.variant &&
          i.weight === product.weight
        );
      });

      if (existing) {
        return prev.map((i) => {
          const isMatch =
            i.id === itemId &&
            i.attributes?.color === product.attributes?.color &&
            i.attributes?.size === product.attributes?.size &&
            i.attributes?.weight === product.attributes?.weight;

          return isMatch ? { ...i, quantity: i.quantity + 1 } : i;
        });
      }
      const newItem: CartItem = {
        ...product,
        id: itemId,
        quantity: 1,
        attributes: product.attributes || {
          color: product.color || '',
          size: product.variant || '',
          weight: product.weight || '',
        },
        color: product.color || product.attributes?.color || '',
        variant: product.variant || product.attributes?.size || '',
        weight: product.weight || product.attributes?.weight || '',
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item,
      ),
    );
  };

  const addUpsellToCart = (id: string) => {
    const upsell = upsellItems.find((u) => u.id === id);
    if (!upsell) return;

    setItems((prev) => {
      const itemId = generateCartItemId({
        productId: Number(upsell.id),
        attributes: {
          color: '',
          size: upsell.size,
          weight: upsell.weight,
        },
      });

      const existing = prev.find((i) => i.id === itemId);

      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      const newItem: CartItem = {
        id: itemId,
        productId: parseInt(upsell.id),
        variationId: 0,
        name: upsell.name,
        color: '',
        variant: upsell.size,
        weight: upsell.weight,
        price: upsell.price,
        image: upsell.image,
        quantity: 1,
        attributes: {
          color: '',
          size: upsell.size,
          weight: upsell.weight,
        },
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = {
          ...item,
          ...updates,
        };

        updatedItem.attributes = {
          ...item.attributes,
          color:
            updates.color ??
            updates.attributes?.color ??
            item.attributes?.color ??
            '',
          size:
            updates.variant ??
            updates.attributes?.size ??
            item.attributes?.size ??
            '',
          weight:
            updates.weight ??
            updates.attributes?.weight ??
            item.attributes?.weight ??
            '',
        };

        return updatedItem;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      upsellItems,
      isOpen,
      openCart,
      closeCart,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      addUpsellToCart,
      updateCartItem,
      setUpsellItems,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [items, upsellItems, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
