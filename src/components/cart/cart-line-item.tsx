import { useWishlist } from '@/src/core/context/wishlist-provider';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CartItem } from './types';
import { getProductById } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';

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
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const wished = isWishlisted(item.id || '');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById({ id: item.id });
        const data = formatProducts(response);
        const quantity = data?.[0]?.stockQuantity ?? null;
        setStockQuantity(quantity);
        console.log('t12', { data });
      } catch (error) {
        console.error('Error fetching product:', error);
        setStockQuantity(null);
      }
    };

    if (item.id) {
      fetchProduct();
    }
  }, [item.id]);

  const isOutOfStock = stockQuantity === 0 || stockQuantity === null;

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
    <div className="flex gap-2 md:gap-3 border-b border-stone-200 px-4 py-3 md:px-6 md:py-4">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-14 w-14 md:h-16 md:w-16 rounded-md object-cover shrink-0"
        />
      ) : (
        <div className="h-14 w-14 md:h-16 md:w-16 rounded-md bg-[#F3EBE4] shrink-0" />
      )}

      <div className="flex flex-1 flex-col gap-0.5 md:gap-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-xs md:text-sm font-medium text-stone-900 truncate">
            {item.name}
          </p>

          <div className="flex items-center gap-1 shrink-0">
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
                    : 'text-stone-400 hover:text-[#35281e] transition-colors'
                }
              />
            </button>

            <button
              onClick={() => onRemove(item.id || '')}
              className="p-1 -m-1"
            >
              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-stone-500 hover:text-stone-900" />
            </button>
          </div>
        </div>

        {item.color && (
          <p className="text-[10px] md:text-xs text-stone-500">
            Farve: {item.color}
          </p>
        )}
        {(item.variant || item.weight) && (
          <p className="text-[10px] md:text-xs text-stone-500">
            {item.variant} {item.variant && item.weight ? '•' : ''}{' '}
            {item.weight}
          </p>
        )}

        {stockQuantity !== null && (
          <p className="text-[10px] md:text-xs text-stone-500">
            På lager: {stockQuantity}
          </p>
        )}

        {showStockWarning && (
          <p className="text-[10px] md:text-xs text-red-600 animate-pulse">
            Kan ikke tilføje mere. Kun {stockQuantity} på lager.
          </p>
        )}

        {isOutOfStock && (
          <p className="text-[10px] md:text-xs text-red-600">Ikke på lager</p>
        )}

        <div className="flex justify-between items-center mt-1">
          <span className="text-xs md:text-sm font-medium">
            {item.price.toLocaleString('da-DK')} kr.
          </span>

          <div className="flex items-center gap-2 border border-stone-300 rounded-full px-2 py-1">
            <button
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
              className={
                item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              <Minus className="h-3 w-3 md:h-3.5 md:w-3.5 text-stone-600" />
            </button>
            <span className="text-xs md:text-sm w-4 text-center">
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
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
            >
              <Plus className="h-3 w-3 md:h-3.5 md:w-3.5 text-stone-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
