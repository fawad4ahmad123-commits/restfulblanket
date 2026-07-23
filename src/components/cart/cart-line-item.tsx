'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { useWishlist } from '@/src/core/context/wishlist-provider';
import { CartItem } from './types';
import { getProductById } from '@/src/lib/products';
import getColorHex from '@/src/helper/color-hexa';

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
  const [attributes, setAttributes] = useState<any[]>([]);

  const wished = isWishlisted(item.id || '');

  useEffect(() => {
    const loadProduct = async () => {
      if (!item.id) return;

      try {
        const product = await getProductById(item.id);
        setAttributes(product?.attribute_links || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [item.id]);

  const stockQuantity =
    item.stockQuantity !== undefined && item.stockQuantity !== null
      ? Number(item.stockQuantity)
      : null;

  const isOutOfStock = stockQuantity === 0;

  const colors = useMemo(
    () =>
      [
        ...new Set(
          attributes
            .filter(
              (attr) => attr?.name?.toLowerCase() === 'color' && attr?.value,
            )
            .map((attr) => attr.value),
        ),
      ] as string[],
    [attributes],
  );

  const sizes = useMemo(
    () =>
      [
        ...new Set(
          attributes
            .filter(
              (attr) => attr?.name?.toLowerCase() === 'size' && attr?.value,
            )
            .map((attr) => attr.value),
        ),
      ] as string[],
    [attributes],
  );

  const weights = useMemo(
    () =>
      [
        ...new Set(
          attributes
            .filter(
              (attr) => attr?.name?.toLowerCase() === 'weight' && attr?.value,
            )
            .map((attr) => attr.value),
        ),
      ] as string[],
    [attributes],
  );

  const [selectedColor, setSelectedColor] = useState(item.color || '');
  const [selectedSize, setSelectedSize] = useState(item.variant || '');
  const [selectedWeight, setSelectedWeight] = useState(item.weight || '');

  useEffect(() => {
    if (!selectedColor && colors.length) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  useEffect(() => {
    if (!selectedSize && sizes.length) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  useEffect(() => {
    if (!selectedWeight && weights.length) {
      setSelectedWeight(weights[0]);
    }
  }, [weights, selectedWeight]);

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
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-medium text-stone-900">
              {item.name}
            </p>

            <div className="mt-2 space-y-1.5">
              {colors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs text-stone-500">Farve</span>
                  <div className="flex gap-1.5">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`h-5 w-5 rounded-full border ${
                          selectedColor === color
                            ? 'border-[#35281E] ring-1 ring-[#E7D6C7]'
                            : 'border-stone-300'
                        }`}
                        style={{
                          backgroundColor: getColorHex(color),
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs text-stone-500">Størrelse</span>
                  <div className="flex gap-1">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded px-2 py-0.5 text-xs ${
                          selectedSize === size
                            ? 'border border-[#35281E] bg-[#E7D6C7]'
                            : 'border border-stone-300 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {weights.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs text-stone-500">Vægt</span>
                  <div className="flex gap-1">
                    {weights.map((weight) => {
                      const weightNumber = weight
                        .replace(/\s*kg\s*/i, '')
                        .trim();
                      return (
                        <button
                          key={weight}
                          type="button"
                          onClick={() => setSelectedWeight(weight)}
                          className={`rounded px-2 py-0.5 text-xs ${
                            selectedWeight === weight
                              ? 'border border-[#35281E] bg-[#E7D6C7]'
                              : 'border border-stone-300 bg-white'
                          }`}
                        >
                          {weightNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
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
            >
              <Heart
                size={16}
                className={
                  wished ? 'fill-[#35281e] text-[#35281e]' : 'text-stone-400'
                }
              />
            </button>

            <button onClick={() => onRemove(item.id || '')}>
              <Trash2 className="h-4 w-4 text-stone-500" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 md:mt-4">
          <span className="text-base font-semibold text-black md:text-lg">
            {(Number(item.price) || 0).toLocaleString('da-DK')} kr.
          </span>

          <div className="flex items-center gap-3 rounded-full border border-stone-300 px-3 py-1.5">
            <button
              onClick={handleDecreaseQuantity}
              className="flex items-center justify-center"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="min-w-[20px] text-center text-sm">
              {item.quantity}
            </span>

            <button
              onClick={handleIncreaseQuantity}
              className="flex items-center justify-center"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
