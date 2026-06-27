'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const {
    image,
    title,
    price,
    originalPrice,
    rating = 4.9,
    reviewCount = 1284,
    weight,
    dimensions,
    isNew,
  } = product;
  const stars = Math.round(rating);
  console.log('t5 card', { image });
  return (
    <div className="group overflow-hidden rounded-[24px] border border-[#E9DDD4] bg-[#fdf9f6] transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="relative h-[340px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {isNew && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
            New
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
          onClick={() => setWished((w) => !w)}
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

      <div className="px-5 pb-5 pt-5">
        <div
          className="mb-3 flex items-center gap-1"
          aria-label={`${rating} out of 5 stars from ${reviewCount} reviews`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              aria-hidden="true"
              className={`h-4 w-4 ${i < stars ? 'text-[#A38575]' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}

          <span className="ml-2 text-xs text-[#392A22]/60">
            {rating} · {reviewCount.toLocaleString()}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-medium leading-snug text-[#35281E]">
          {title}
        </h3>

        {(weight || dimensions) && (
          <p className="mb-4 text-xs text-[#35281E]/50">
            {[weight, dimensions].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="mb-5 flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3b281f]">{price}</span>
          {originalPrice && (
            <span className="text-sm text-[#35281E] line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          title={`Add ${title} to cart`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAF4EE] py-3 text-sm font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
