'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CrossSellProduct {
  id: string;
  name: string;
  image: string;
  dimensions?: string;
  weight?: string;
  price: number;
  currency?: string;
}

interface OthersAlsoBoughtProps {
  products?: CrossSellProduct[];
  onAddToCart?: (product: CrossSellProduct) => void;
  className?: string;
}

const OthersAlsoBought = ({
  products = [],
  onAddToCart,
  className,
}: OthersAlsoBoughtProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const total = products.length;

  const goPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const goNext = () =>
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  if (total === 0) {
    return null;
  }

  const product = products[activeIndex];

  return (
    <section
      className={cn('border-t border-[#E3DCCD] pt-6', className)}
      aria-label="Others also bought"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-[22px] font-semibold text-[#3F3A36]">
          Others also bought
        </h2>

        {total > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous product"
              onClick={goPrev}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F3A36] transition-colors hover:bg-[#F0E9DC]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span
              className="min-w-[36px] text-center text-sm text-[#8A8377]"
              aria-live="polite"
            >
              {activeIndex + 1} / {total}
            </span>

            <button
              type="button"
              aria-label="Next product"
              onClick={goNext}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F3A36] transition-colors hover:bg-[#F0E9DC]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div
        key={product.id}
        className="flex items-center gap-4 rounded-2xl bg-[#F2ECE0] p-3 pr-5 animate-in fade-in duration-300"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#E3DCCD] sm:h-20 sm:w-20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-[#3F3A36] sm:text-base">
            {product.name}
          </p>
          {(product.dimensions || product.weight) && (
            <p className="mt-0.5 text-sm text-[#8A8377]">
              {[product.dimensions, product.weight].filter(Boolean).join(', ')}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <span className="whitespace-nowrap font-serif text-lg font-semibold text-[#3F3A36] sm:text-xl">
            {product.currency ?? '$'}
            {product.price.toFixed(2)}
          </span>

          <Button
            type="button"
            size="sm"
            onClick={() => onAddToCart?.(product)}
            className="rounded-full bg-[#35281E] px-5 text-white hover:bg-[#4A382E]"
          >
            Add
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OthersAlsoBought;
