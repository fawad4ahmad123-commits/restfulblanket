'use client';

import { toast } from 'sonner';
import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { CartContextType, CartItem, UpsellItem } from './types';

export const CartContext = createContext<CartContextType | null>(null);

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
      const getNormalizedAttributes = (item: any) => {
        const color = item.color || item.attributes?.color || '';
        const size = item.variant || item.attributes?.size || '';
        const weight = item.weight || item.attributes?.weight || '';
        return { color, size, weight };
      };

      const productAttrs = getNormalizedAttributes(product);

      const existingIndex = prev.findIndex((item) => {
        if (item.productId !== product.productId) return false;

        const itemAttrs = getNormalizedAttributes(item);
        return (
          itemAttrs.color === productAttrs.color &&
          itemAttrs.size === productAttrs.size &&
          itemAttrs.weight === productAttrs.weight
        );
      });

      const stockQuantity = Number(product.stockQuantity) || 0;
      const currentQuantity =
        existingIndex !== -1 ? prev[existingIndex].quantity : 0;
      const newQuantity = currentQuantity + 1;

      if (stockQuantity > 0 && newQuantity > stockQuantity) {
        let message = '';
        if (stockQuantity === 0) {
          message = 'Desværre, denne vare er ikke på lager.';
        } else if (currentQuantity >= stockQuantity) {
          message = `Du har allerede det maksimale antal (${stockQuantity}) af denne vare i kurven.`;
        } else {
          message = `Beklager, kun ${stockQuantity} stk. er tilgængelige på lager. Du har ${currentQuantity} i kurven.`;
        }

        toast.error(message, {
          duration: 4000,
          position: 'top-center',
        });

        return prev;
      }

      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      }

      const uniqueId = `${product.productId}-${productAttrs.color}-${productAttrs.size}-${productAttrs.weight}`;

      const newItem: CartItem = {
        ...product,
        id: product.id || uniqueId,
        quantity: 1,
        attributes: {
          color: productAttrs.color,
          size: productAttrs.size,
          weight: productAttrs.weight,
        },
        color: productAttrs.color,
        variant: productAttrs.size,
        weight: productAttrs.weight,
        stockQuantity: stockQuantity,
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
