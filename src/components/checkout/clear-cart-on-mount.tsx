'use client';

import { useEffect, useRef } from 'react';

import { useCart } from '@/src/core/context/card-Provider';

export default function ClearCartOnMount() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;

    hasCleared.current = true;
    clearCart();
  }, [clearCart]);

  return null;
}
