'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '../types/product';

interface ProductCardProps {
  product: any;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const router = useRouter();

  const rating = product.rating || 4.9;
  const reviewCount = product.reviewCount || 1284;
  const stars = Math.round(rating);

  return (
    <div
      className="group overflow-hidden rounded-[24px] bg-[#fdf9f6] transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="relative h-[340px] md:h-[420px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              product.hoverImage ? 'group-hover:opacity-0' : ''
            }`}
          />

          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        {(product.badge || product.isNew) && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
            {product.badge || 'New'}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setWished((prev) => !prev);
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Heart
            size={16}
            className={
              wished ? 'fill-[#35281e] text-[#35281e]' : 'text-[#35281e]'
            }
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 pt-14 transition-all duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${product.slug}`);
            }}
            className="flex h-[44px] w-full max-w-[282px] items-center justify-center gap-[6px] rounded-full bg-[#FAF4EE] px-5 py-3 text-xs font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white"
          >
            <Eye size={14} />
            Quick View
          </button>
        </div>
      </div>

      <div className="px-5 pb-5 pt-5">
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < stars ? 'text-[#A38575]' : 'text-gray-300'
              }`}
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
          {product.name}
        </h3>

        {(product.weight || product.size) && (
          <p className="mb-4 text-xs text-[#35281E]/50">
            {[product.weight, product.size].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="mb-5 flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3b281f]">
            €{product.price}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-[#35281E] line-through">
              €{product.originalPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAF4EE] py-3 text-sm font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
