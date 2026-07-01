'use client';

import Image from 'next/image';
import { Heart, Repeat2, ShoppingBag } from 'lucide-react';

import { useState } from 'react';
import { WishlistItem } from './type';
import { StarRating } from './star-rating';

interface WishlistCardProps {
  item: WishlistItem;
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onCompare?: (id: string) => void;
}

export function WishlistCard({
  item,
  onToggleFavorite,
  onAddToCart,
  onCompare,
}: WishlistCardProps) {
  const [isFavorited, setIsFavorited] = useState(true);

  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
    onToggleFavorite?.(item.id);
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E9DDD4] bg-white transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F2ED]">
        {item.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#35281E]">
            {item.badge}
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
          aria-label="Toggle favorite"
        >
          <Heart
            size={15}
            className={
              isFavorited ? 'fill-[#35281E] text-[#35281E]' : 'text-[#35281E]'
            }
          />
        </button>

        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <StarRating rating={item.rating} reviewCount={item.reviewCount} />
        </div>
        <h3 className="mb-2 line-clamp-2 text-[15px] font-medium leading-5 text-[#35281E]">
          {item.name}
        </h3>
        {(item.weight || item.dimensions) && (
          <p className="mb-3 text-xs text-[#8A8377]">
            {[item.weight, item.dimensions].filter(Boolean).join(' • ')}
          </p>
        )}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#35281E]">
              {item.currency}
              {item.price}
            </span>

            {item.originalPrice && (
              <span className="text-sm text-[#8A8377] line-through">
                {item.currency}
                {item.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onCompare?.(item.id)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E9DDD4] text-[#8A8377] transition hover:bg-[#FAF4EE]"
            aria-label="Compare"
          >
            <Repeat2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          onClick={() => onAddToCart?.(item.id)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAF4EE] py-3 text-sm font-medium text-[#35281E] transition-all hover:bg-[#35281E] hover:text-white"
        >
          <ShoppingBag size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
