'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from './constants';
import { StarRating } from './start-rating';
import { useCart } from '@/src/core/context/card-Provider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, image, price, originalPrice, badge, weightKg, sizeCm } =
    product;
  const [wished, setWished] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E9DDD4] bg-[#fdf9f6] transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="relative h-[340px] md:h-[420px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </div>

        {badge && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
            {badge}
          </div>
        )}

        <button
          type="button"
          aria-label={
            wished
              ? `Remove ${title} from wishlist`
              : `Add ${title} to wishlist`
          }
          title={
            wished
              ? `Remove ${title} from wishlist`
              : `Add ${title} to wishlist`
          }
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Heart
            aria-hidden="true"
            size={16}
            className={
              wished ? 'fill-[#35281e] text-[#35281e]' : 'text-[#35281e]'
            }
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <h3 className="mb-2 mt-3 line-clamp-2 min-h-[3.25rem] text-lg font-medium leading-snug text-[#35281E]">
          {title}
        </h3>

        {(weightKg || sizeCm) && (
          <p className="mb-4 text-xs text-[#35281E]/50">
            {[weightKg ? `${weightKg} kg` : null, sizeCm]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}

        <div className="mb-5 flex items-center gap-2">
          {price && (
            <span className="text-lg font-semibold text-[#3b281f]">
              kr{price}
            </span>
          )}
          {originalPrice && (
            <span className="text-sm text-[#35281E] line-through">
              kr{originalPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          title={`Add ${title} to cart`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: String(product.id),
              name: title,
              color: product.material || '',
              variant: product.sizeCm || '',
              weight: weightKg ? `${weightKg} kg` : '',
              price: Number(price) || 0,
              image,
            });
          }}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#E9DDD4] py-3 text-sm font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Tilføj til kurv
        </button>
      </div>
    </div>
  );
}
