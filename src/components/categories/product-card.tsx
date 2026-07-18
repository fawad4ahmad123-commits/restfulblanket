'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Check, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { formatPrice } from '@/src/helper/product-feature';
import { useCart } from '@/src/core/context/card-Provider';
import { useCompare } from '@/src/core/context/compare-provider';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: number | string;
  slug: string;
  image: string;
  hoverImage?: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  color?: string;
  size?: string;
  stockQuantity?: number | null;
  stockStatus?: string;
}

const ProductCard = ({
  id,
  slug,
  image,
  hoverImage,
  name,
  price,
  originalPrice,
  badge,
  rating = 4.9,
  reviewCount = 3254,
  weight,
  dimensions,
  color,
  size,
  stockQuantity = null,
  stockStatus = 'outofstock',
}: ProductCardProps) => {
  const [wished, setWished] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();
  const { compareItems, toggleCompare } = useCompare();

  const isCompared = compareItems.some(
    (item) => String(item.id) === String(id),
  );

  const stars = Math.round(rating);
  const isOutOfStock = stockStatus === 'outofstock' || stockQuantity === 0;

  const handleNavigate = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`View product ${name}`}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-[#E9DDD4] bg-[#fdf9f6] transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#35281E] focus:ring-offset-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F2ED]">
        <Image
          src={image}
          alt={`${name} product image`}
          fill
          className={`object-cover transition-all duration-500 ${
            hoverImage ? 'group-hover:opacity-0' : ''
          }`}
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} alternate product image`}
            fill
            className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
          />
        )}

        {badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#35281E]">
            {badge}
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#35281E]">
              Udsolgt
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label={
            wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
          }
          title={
            wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
          }
          onClick={(e) => {
            e.stopPropagation();
            setWished((prev) => !prev);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#35281E]"
        >
          <Heart
            aria-hidden="true"
            size={15}
            className={
              wished ? 'fill-[#35281E] text-[#35281E]' : 'text-[#35281E]'
            }
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 pt-14 transition-all duration-300 group-hover:translate-y-0 cursor-pointer">
          <button
            type="button"
            aria-label={`Hurtig visning af ${name}`}
            title={`Hurtig visning af ${name}`}
            className="flex h-[44px] w-full max-w-[282px] items-center justify-center gap-[6px] rounded-full bg-[#FAF4EE] px-5 py-3 text-xs font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${slug}`);
            }}
          >
            <Eye aria-hidden="true" size={14} />
            Hurtig visning
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div
          className="mb-2 flex items-center gap-2"
          aria-label={`${rating} out of 5 stars from ${reviewCount} reviews`}
        >
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                aria-hidden="true"
                key={i}
                className={`h-4 w-4 ${
                  i < stars ? 'fill-[#E6CBB8] text-[#E6CBB8]' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <span className="text-sm font-medium text-[#3F3A36]">{rating}</span>

          <span className="text-sm text-[#8A8377]">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        <h3
          className="mb-2 text-[15px] font-medium leading-5 text-[#35281E]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </h3>

        {(weight || dimensions) && (
          <p className="mb-3 text-xs text-[#8A8377]">
            {[weight, dimensions].filter(Boolean).join(' • ')}
          </p>
        )}

        <div className="mt-auto">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-[#35281E]">
                {formatPrice(price)}
              </span>

              {originalPrice && (
                <span className="text-sm text-[#8A8377] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <button
              type="button"
              aria-label={
                isCompared
                  ? `Remove ${name} from comparison`
                  : `Compare ${name}`
              }
              title={
                isCompared
                  ? `Remove ${name} from comparison`
                  : `Compare ${name}`
              }
              onClick={(e) => {
                e.stopPropagation();

                toggleCompare({
                  id: String(id),
                  title: name,
                  image,
                  price: Number(price) || 0,
                  slug,
                });
              }}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#35281E] ${
                isCompared
                  ? 'border-[#3B281F] bg-[#3B281F] text-white'
                  : 'border-[#E9DDD4] bg-white text-[#3B281F]'
              }`}
            >
              {isCompared ? (
                <Check aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Image
                  src="/home/card-compare-icon.png"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className={cn('h-5 w-5')}
                />
              )}
            </button>
          </div>

          <button
            type="button"
            aria-label={
              isOutOfStock ? `${name} is out of stock` : `Add ${name} to cart`
            }
            title={isOutOfStock ? 'Out of stock' : `Add ${name} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              if (isOutOfStock) return;

              addToCart({
                id: String(id),
                name,
                color: color || '',
                variant: size || '',
                weight: weight || '',
                price: Number(price) || 0,
                image,
              });
            }}
            disabled={isOutOfStock}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#35281E] ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                : 'bg-[#FAF4EE] text-[#35281E] hover:bg-[#35281E] hover:text-white'
            }`}
          >
            <ShoppingBag aria-hidden="true" size={16} />
            {isOutOfStock ? 'Udsolgt' : 'Tilføj til kurv'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
