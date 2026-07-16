'use client';

import Image from 'next/image';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { SliderCard as SliderCardProps } from './types';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/src/helper/product-feature';
import { useCart } from '@/src/core/context/card-Provider';
import { useCompare } from '@/src/core/context/compare-provider';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/src/core/context/wishlist-provider';
import { useState } from 'react';
import ProductConfigOverlay from './product-config-overlay';

interface ExtendedSliderCardProps extends SliderCardProps {
  hoverImage?: string;
  stockQuantity?: string | number | null;
  stockStatus?: string;
  availableColors?: string[];
  availableSizes?: string[];
  availableWeights?: string[];
}

const SliderCard = ({
  image,
  slug,
  hoverImage,
  title,
  price,
  badge,
  id,
  originalPrice,
  rating = 4.9,
  reviewCount = 1284,
  weight,
  dimensions,
  color,
  size,
  isProduct,
  stockQuantity = null,
  stockStatus = 'outofstock',
  // availableColors = [],
  // availableSizes = [],
  // availableWeights = [],
}: ExtendedSliderCardProps) => {
  const { addToCart } = useCart();
  const { compareItems, toggleCompare } = useCompare();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const wished = isWishlisted(String(id));
  const isCompared = compareItems.some(
    (item) => String(item.id) === String(id),
  );
  const stars = Math.round(rating);
  const isOutOfStock = stockStatus === 'outofstock' || stockQuantity === 0;
  // const [showConfig, setShowConfig] = useState(false);
  // const [selectedColor, setSelectedColor] = useState(color || '');
  // const [selectedSize, setSelectedSize] = useState(size || '');
  // const [selectedWeight, setSelectedWeight] = useState(weight || '');
  // const hasOptions =
  //   availableColors.length > 0 ||
  //   availableSizes.length > 0 ||
  //   availableWeights.length > 0;

  // const handleAddToCartClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (isOutOfStock) return;
  //   if (hasOptions) {
  //     setShowConfig(true);
  //     return;
  //   }
  //   addToCart({
  //     id: String(id),
  //     name: title,
  //     color: color || '',
  //     variant: size || '',
  //     weight: weight || '',
  //     price: Number(price) || 0,
  //     image,
  //   });
  // };

  // const confirmAddToCart = () => {
  //   addToCart({
  //     id: String(id),
  //     name: title,
  //     color: selectedColor,
  //     variant: selectedSize,
  //     weight: selectedWeight,
  //     price: Number(price) || 0,
  //     image,
  //   });
  //   setShowConfig(false);
  // };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOutOfStock) return;

    addToCart({
      id: String(id),
      name: title,
      color: color || '',
      variant: size || '',
      weight: weight || '',
      price: Number(price) || 0,
      image,
      stockQuantity,
    });
  };
  return (
    <>
      <div
        className="group flex h-[624px] flex-col overflow-hidden rounded-[24px] border border-[#E9DDD4] bg-[#fdf9f6] transition-all duration-300"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <div className="relative overflow-hidden">
          <div
            className={`
              relative
              h-[340px]
              md:h-[420px]
              transition-all
              duration-300
            `}
            // className={`
            //   relative
            //   h-[340px]
            //   md:h-[420px]
            //   transition-all
            //   duration-300
            //   ${showConfig ? 'blur-sm scale-105' : ''}
            // `}
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className={`
                  object-cover
                  transition-all
                  duration-500
                  ${hoverImage ? 'group-hover:opacity-0' : ''}
                `}
              />
            ) : (
              <div className="h-full w-full bg-[#F3EBE4]" />
            )}
            {hoverImage && image && (
              <Image
                src={hoverImage}
                alt={`${title} alternate image`}
                fill
                className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
              />
            )}
          </div>

          {/* {showConfig && (
            <ProductConfigOverlay
              availableColors={availableColors}
              availableSizes={availableSizes}
              availableWeights={availableWeights}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              selectedWeight={selectedWeight}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              setSelectedWeight={setSelectedWeight}
              onClose={() => setShowConfig(false)}
              onAddToCart={confirmAddToCart}
            />
          )} */}

          {isProduct === false && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
              {badge || 'Best Seller'}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist({
                id: String(id),
                name: title,
                price: Number(price) || 0,
                image,
                slug,
                hoverImage,
                originalPrice: originalPrice
                  ? Number(originalPrice)
                  : undefined,
                rating,
                reviewCount,
                weight,
                dimensions,
                color,
                size,
                badge,
              });
            }}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
          >
            <Heart
              size={16}
              className={
                wished ? 'fill-[#35281E] text-[#35281E]' : 'text-[#35281E]'
              }
            />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 pt-14 transition-all duration-300 group-hover:translate-y-0">
            <button
              type="button"
              aria-label={`Quick view ${title}`}
              title={`Quick view ${title}`}
              className="flex h-[44px] w-full max-w-[282px] items-center justify-center gap-[6px] rounded-full bg-[#FAF4EE] px-5 py-3 text-xs font-medium text-[#35281E] transition hover:bg-[#35281E] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/${slug}`);
              }}
            >
              <Eye aria-hidden="true" size={14} />
              Hurtig visning
            </button>
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#35281E]">
                Udsolgt
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`
                  h-4
                  w-4
                  ${i < stars ? 'text-[#A38575]' : 'text-gray-300'}
                `}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-xs text-[#35281E]">
              {rating} · {reviewCount.toLocaleString()}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2  text-lg font-medium leading-snug text-[#35281E]">
            {title}
          </h3>

          {(weight || size) && (
            <p className="mb-2 text-xs text-[#35281E]/50">
              {[weight, size].filter(Boolean).join(' · ')}
            </p>
          )}

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-[#3b281f]">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-[#35281E] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare({
                  id: String(id),
                  title,
                  image,
                  price: Number(price) || 0,
                  slug,
                });
              }}
              className={cn(
                `
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                `,
                isCompared
                  ? 'bg-[#3B281F] text-white border-[#3B281F]'
                  : 'bg-white text-[#3B281F] border-[#E9DDD4]',
              )}
            >
              {isCompared ? (
                <Check className="h-5 w-5" />
              ) : (
                <Image
                  src="/home/card-compare-icon.png"
                  alt="compare"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCartClick}
            className={cn(
              `
                mt-auto
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                py-3
                text-sm
                font-medium
                transition
              `,
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'cursor-pointer bg-[#E9DDD4] text-[#35281E] hover:bg-[#35281E] hover:text-white',
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            {isOutOfStock ? 'Udsolgt' : 'Tilføj til kurv'}
          </button>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
