'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/src/helper/product-feature';

interface ProductCardProps {
  id: number;
  slug: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  onAddToCart?: () => void;
}

const ProductCard = ({
  slug,
  image,
  title,
  price,
  originalPrice,
  badge,
  rating = 4.9,
  reviewCount = 3254,
  weight,
  dimensions,
  onAddToCart,
}: any) => {
  const [wished, setWished] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${slug}`)}
      className="cursor-pointer overflow-hidden rounded-[20px] border border-[#E9DDD4] bg-white transition-all duration-300 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F2ED]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#35281E]">
            {badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished(!wished);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart
            size={15}
            className={
              wished ? 'fill-[#35281E] text-[#35281E]' : 'text-[#35281E]'
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#E6CBB8] text-[#E6CBB8]" />
            ))}
          </div>

          <span className="text-sm font-medium text-[#3F3A36]">{rating}</span>

          <span className="text-sm text-[#8A8377]">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-[15px] font-medium leading-5 text-[#35281E]">
          {title}
        </h3>

        {/* Weight & Dimensions */}
        {(weight || dimensions) && (
          <p className="mb-3 text-xs text-[#8A8377]">
            {[weight, dimensions].filter(Boolean).join(' • ')}
          </p>
        )}

        {/* Price */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg font-semibold text-[#35281E]">
            {formatPrice(price)}
          </span>

          {originalPrice && (
            <span className="text-sm text-[#8A8377] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAF4EE] py-3 text-sm font-medium text-[#35281E] transition-all hover:bg-[#35281E] hover:text-white"
        >
          <ShoppingBag size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
