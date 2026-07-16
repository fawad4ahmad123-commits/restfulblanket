'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Check, Eye } from 'lucide-react';
import { useCart } from '@/src/core/context/card-Provider';
import { useWishlist } from '@/src/core/context/wishlist-provider';
import { useCompare } from '@/src/core/context/compare-provider';
import { cn } from '@/lib/utils';
import { parsePrice } from '@/src/utilty/use-parse-price';

interface Product {
  id: string | number;
  image: string;
  title: string;
  slug: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  color?: string;
  size?: string;
  dimensions?: string;
  isNew?: boolean;
  stockQuantity?: number | null;
  stockStatus?: string;
  // availableColors?: string[];
  // availableSizes?: string[];
  // availableWeights?: string[];
}
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { compareItems, toggleCompare } = useCompare();
  const {
    id,
    image,
    title,
    slug,
    price,
    originalPrice,
    rating = 4.9,
    reviewCount = 1284,
    weight,
    dimensions,
    isNew,
    stockQuantity = null,
    stockStatus = 'outofstock',
    color,
    size,
    // availableColors = [],
    // availableSizes = [],
    // availableWeights = [],
  } = product;
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

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOutOfStock) return;
    addToCart({
      id: String(id),
      name: title,
      color: color || '',
      variant: size || '',
      weight: weight || '',
      price: parsePrice(price),
      image,
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E9DDD4] bg-[#fdf9f6] transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="relative h-[340px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
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
        {isNew && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
            New
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
            wished
              ? `Fjern ${title} fra ønskeliste`
              : `Tilføj ${title} til ønskeliste`
          }
          title={
            wished
              ? `Fjern ${title} fra ønskeliste`
              : `Tilføj ${title} til ønskeliste`
          }
          onClick={() =>
            toggleWishlist({
              id: String(id),
              name: title,
              price: Number(price) || 0,
              image,
              slug,
              weight,
              dimensions,
            })
          }
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Heart
            aria-hidden="true"
            size={16}
            className={
              wished ? 'fill-[#35281e] text-[#35281e]' : 'text-[#35281e]'
            }
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 pt-14 transition-all duration-300 group-hover:translate-y-0">
          <button
            type="button"
            aria-label={`Quick view ${title}`}
            title={`Quick view ${title}`}
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
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <div
          className="mb-3 flex items-center gap-1"
          aria-label={`${rating} out of 5 stars from ${reviewCount} reviews`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              aria-hidden="true"
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
          {title}
        </h3>

        {(weight || dimensions) && (
          <p className="mb-4 text-xs text-[#35281E]/50">
            {[weight, dimensions].filter(Boolean).join(' · ')}
          </p>
        )}
        <div className="mt-auto">
          <div className="mb-5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-[#3b281f]">
                {price}
              </span>

              {originalPrice && (
                <span className="text-sm text-[#35281E] line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              aria-label={
                isCompared ? `Remove ${title} from compare` : `Compare ${title}`
              }
              title={
                isCompared ? `Remove ${title} from compare` : `Compare ${title}`
              }
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
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                isCompared
                  ? 'border-[#3B281F] bg-[#3B281F] text-white'
                  : 'border-[#E9DDD4] bg-white text-[#3B281F]'
              }`}
            >
              {isCompared ? (
                <Check className="h-5 w-5" />
              ) : (
                <Image
                  src="/home/card-compare-icon.png"
                  alt="compare-icon"
                  width={20}
                  height={20}
                  className={cn('h-5 w-5 md:h-[18px] md:w-[18px]')}
                />
              )}
            </button>
          </div>

          <button
            type="button"
            aria-label={
              isOutOfStock ? `${title} is out of stock` : `Add ${title} to cart`
            }
            title={isOutOfStock ? 'Out of stock' : `Add ${title} to cart`}
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                : 'bg-[#E9DDD4] text-[#35281E] hover:bg-[#35281E] hover:text-white'
            }`}
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            {isOutOfStock ? 'Udsolgt' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
