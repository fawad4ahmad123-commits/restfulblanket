import { Trash2, Heart } from 'lucide-react';
import QuantityStepper from './quantity-stepper';
import { CartLine } from './types';
import { useWishlist } from '@/src/core/context/wishlist-provider';

export default function CartLineItem({
  item,
  onRemove,
  onChangeQty,
}: CartLine) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(item.id);

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
            {/* Wishlist (heart) button */}
            <button
              type="button"
              aria-label={
                wished
                  ? `Fjern ${item.name} fra ønskeliste`
                  : `Gem ${item.name} på ønskeliste`
              }
              title={
                wished
                  ? `Fjern ${item.name} fra ønskeliste`
                  : `Gem ${item.name} på ønskeliste`
              }
              onClick={() =>
                toggleWishlist({
                  id: item.id,
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

            {/* Remove button */}
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 -m-1"
            >
              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-stone-500 hover:text-stone-900" />
            </button>
          </div>
        </div>

        <p className="text-[10px] md:text-xs text-stone-500">
          Farve: {item.color}
        </p>
        <p className="text-[10px] md:text-xs text-stone-500">
          {item.variant} • {item.weight}
        </p>

        <div className="flex justify-between items-center mt-1">
          <span className="text-xs md:text-sm font-medium">
            {item.price.toLocaleString('da-DK')} kr.
          </span>

          <QuantityStepper
            value={item.quantity}
            onDecrease={() => onChangeQty(item.id, -1)}
            onIncrease={() => onChangeQty(item.id, 1)}
          />
        </div>
      </div>
    </div>
  );
}
