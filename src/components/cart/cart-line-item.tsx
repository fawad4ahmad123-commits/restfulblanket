'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { useWishlist } from '@/src/core/context/wishlist-provider';
import { CartItem } from './types';
import { getProductById } from '@/src/lib/products';
import getColorHex from '@/src/helper/color-hexa';
import { Loader } from '../loader';
import { useCart } from '@/src/core/context/card-Provider';

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
  const { updateCartItem } = useCart();
  const [showStockWarning, setShowStockWarning] = useState(false);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const wished = isWishlisted(item.id || '');

  const [selectedColor, setSelectedColor] = useState(item.color || '');
  const [selectedSize, setSelectedSize] = useState(item.variant || '');
  const [selectedWeight, setSelectedWeight] = useState(item.weight || '');

  const loadProduct = async (productId: number | string) => {
    setIsLoading(true);
    try {
      const product = await getProductById(productId);
      setCurrentProduct(product);
      setAttributes(product?.attribute_links || []);

      const activeColor = product?.attribute_links?.find(
        (a: any) => a.name === 'color' && a.related_product === 0,
      );
      const activeSize = product?.attribute_links?.find(
        (a: any) => a.name === 'size' && a.related_product === 0,
      );
      const activeWeight = product?.attribute_links?.find(
        (a: any) => a.name === 'weight' && a.related_product === 0,
      );

      if (activeColor) setSelectedColor(activeColor.value);
      if (activeSize) setSelectedSize(activeSize.value);
      if (activeWeight) setSelectedWeight(activeWeight.value);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (item.id) {
      loadProduct(item.id);
    }
  }, [item.id]);

  const handleAttributeChange = async (
    type: 'color' | 'size' | 'weight',
    value: string,
  ) => {
    const match = attributes.find(
      (attr) => attr.name?.toLowerCase() === type && attr.value === value,
    );

    if (!match) return;

    let nextColor = selectedColor;
    let nextSize = selectedSize;
    let nextWeight = selectedWeight;

    if (type === 'color') {
      nextColor = value;
      setSelectedColor(value);
    }

    if (type === 'size') {
      nextSize = value;
      setSelectedSize(value);
    }

    if (type === 'weight') {
      nextWeight = value;
      setSelectedWeight(value);
    }

    const cartItemId = item.id;

    if (!cartItemId) return;

    updateCartItem(cartItemId, {
      color: nextColor,
      variant: nextSize,
      weight: nextWeight,
    });

    if (match.related_product && match.related_product !== 0) {
      try {
        const product = await getProductById(match.related_product);

        if (!product) return;

        setCurrentProduct(product);
        setAttributes(product.attribute_links || []);

        updateCartItem(cartItemId, {
          productId: product.id,
          name: product.name,
          image: product.image || product.images?.[0]?.src || '',
          price: Number(product.price) || 0,
          color: nextColor,
          variant: nextSize,
          weight: nextWeight,
        });
      } catch (error) {
        console.error('Failed to load related product', error);
      }
    }
  };

  const displayProduct = currentProduct || item;

  const stockQuantity =
    item.stockQuantity !== undefined && item.stockQuantity !== null
      ? Number(item.stockQuantity)
      : null;

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

  const handleIncreaseQuantity = () => {
    if (stockQuantity !== null && item.quantity >= stockQuantity) {
      setShowStockWarning(true);
      setTimeout(() => setShowStockWarning(false), 3000);
      return;
    }

    onChangeQty(item.cartItemId || item.id || '', 1);
  };

  const handleDecreaseQuantity = () => {
    setShowStockWarning(false);
    onChangeQty(item.cartItemId || item.id || '', -1);
  };

  const displayImage =
    currentProduct?.image || currentProduct?.images?.[0]?.src || item.image;

  if (isLoading) {
    return (
      <div className="flex min-h-[120px] items-center justify-center border-b border-stone-200 px-4 py-3 md:px-6 md:py-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex gap-2 border-b border-stone-200 px-4 py-3 md:gap-3 md:px-6 md:py-4">
      {displayImage ? (
        <img
          src={displayImage}
          alt={displayProduct.name}
          className="h-14 w-14 shrink-0 rounded-md object-cover md:h-16 md:w-16"
        />
      ) : (
        <div className="h-14 w-14 shrink-0 rounded-md bg-[#F3EBE4] md:h-16 md:w-16" />
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-medium text-stone-900">
              {displayProduct.name}
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
                        onClick={() => handleAttributeChange('color', color)}
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
                        onClick={() => handleAttributeChange('size', size)}
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
                          onClick={() =>
                            handleAttributeChange('weight', weight)
                          }
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
                  name: displayProduct.name,
                  price: displayProduct.price,
                  image: displayProduct.image,
                  weight: selectedWeight,
                  color: selectedColor,
                  size: selectedSize,
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

            <button onClick={() => onRemove(item.cartItemId || item.id || '')}>
              <Trash2 className="h-4 w-4 text-stone-500" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 md:mt-4">
          <span className="text-base font-semibold text-black md:text-lg">
            {(Number(displayProduct.price) || 0).toLocaleString('da-DK')} kr.
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
