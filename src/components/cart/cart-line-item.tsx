'use client';

import { useWishlist } from '@/src/core/context/wishlist-provider';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from './types';

export default function CartLineItem({
  item,
  onRemove,
  onChangeQty,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
}) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [showStockWarning, setShowStockWarning] = useState(false);

  const wished = isWishlisted(item.id || '');

  const stockQuantity =
    item.stockQuantity !== undefined && item.stockQuantity !== null
      ? Number(item.stockQuantity)
      : null;

  const isOutOfStock = stockQuantity === 0;

  const handleIncreaseQuantity = () => {
    if (stockQuantity !== null && item.quantity >= stockQuantity) {
      setShowStockWarning(true);
      setTimeout(() => setShowStockWarning(false), 3000);
      return;
    }

    onChangeQty(item.id || '', 1);
  };

  const handleDecreaseQuantity = () => {
    setShowStockWarning(false);
    onChangeQty(item.id || '', -1);
  };

  return (
    <div className="flex gap-2 border-b border-stone-200 px-4 py-3 md:gap-3 md:px-6 md:py-4">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-14 w-14 shrink-0 rounded-md object-cover md:h-16 md:w-16"
        />
      ) : (
        <div className="h-14 w-14 shrink-0 rounded-md bg-[#F3EBE4] md:h-16 md:w-16" />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-xs font-medium text-stone-900 md:text-sm">
            {item.name}
          </p>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  id: item.id ?? '',
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  weight: item.weight,
                  color: item.color,
                  size: item.variant,
                })
              }
              className="p-1 -m-1"
            >
              <Heart
                size={14}
                className={
                  wished
                    ? 'fill-[#35281e] text-[#35281e]'
                    : 'text-stone-400 transition-colors hover:text-[#35281e]'
                }
              />
            </button>

            <button
              onClick={() => onRemove(item.id || '')}
              className="p-1 -m-1"
            >
              <Trash2 className="h-3.5 w-3.5 text-stone-500 hover:text-stone-900 md:h-4 md:w-4" />
            </button>
          </div>
        </div>

        {item.color && (
          <p className="text-[10px] text-stone-500 md:text-xs">
            Farve: {item.color}
          </p>
        )}

        {(item.variant || item.weight) && (
          <p className="text-[10px] text-stone-500 md:text-xs">
            {item.variant} {item.variant && item.weight ? '•' : ''}{' '}
            {item.weight}
          </p>
        )}

        {stockQuantity === 0 && (
          <p className="text-[10px] text-stone-500 md:text-xs">
            På lager: {stockQuantity}
          </p>
        )}

        {showStockWarning && stockQuantity !== null && (
          <p className="animate-pulse text-[10px] text-red-600 md:text-xs">
            Kan ikke tilføje mere. Kun {stockQuantity} på lager.
          </p>
        )}

        {isOutOfStock && (
          <p className="text-[10px] text-red-600 md:text-xs">Ikke på lager</p>
        )}

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs font-medium md:text-sm">
            {(Number(item.price) || 0).toLocaleString('da-DK')} kr.
          </span>

          <div className="flex items-center gap-2 rounded-full border border-stone-300 px-2 py-1">
            <button
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
              className={
                item.quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''
              }
            >
              <Minus className="h-3 w-3 text-stone-600 md:h-3.5 md:w-3.5" />
            </button>

            <span className="w-4 text-center text-xs md:text-sm">
              {item.quantity}
            </span>

            <button
              onClick={handleIncreaseQuantity}
              disabled={
                isOutOfStock ||
                (stockQuantity !== null && item.quantity >= stockQuantity)
              }
              className={
                isOutOfStock ||
                (stockQuantity !== null && item.quantity >= stockQuantity)
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }
            >
              <Plus className="h-3 w-3 text-stone-600 md:h-3.5 md:w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
