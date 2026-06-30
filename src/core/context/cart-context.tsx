'use client';

import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { CartContextType, CartItem, UpsellItem } from './types';

export const CartContext = createContext<CartContextType | null>(null);

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

  const setCartOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === product.id &&
          i.color === product.color &&
          i.variant === product.variant &&
          i.weight === product.weight,
      );

      if (existing) {
        return prev.map((i) =>
          i.id === product.id &&
          i.color === product.color &&
          i.variant === product.variant &&
          i.weight === product.weight
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
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
      const existing = prev.find(
        (i) =>
          i.id === upsell.id &&
          i.variant === upsell.size &&
          i.weight === upsell.weight,
      );

      if (existing) {
        return prev.map((i) =>
          i.id === upsell.id &&
          i.variant === upsell.size &&
          i.weight === upsell.weight
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [
        ...prev,
        {
          id: upsell.id,
          name: upsell.name,
          color: '',
          variant: upsell.size,
          weight: upsell.weight,
          price: upsell.price,
          image: upsell.image,
          quantity: 1,
        },
      ];
    });

    setIsOpen(true);
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
      setUpsellItems,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [items, upsellItems, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
