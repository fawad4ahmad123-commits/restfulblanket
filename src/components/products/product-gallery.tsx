'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images?: string[];
  badge?: string;
  productName?: string;
}

const ProductGallery = ({
  images = [],
  badge,
  productName = 'Product',
}: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const safeImages = Array.isArray(images) ? images : [];

  const goPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));

  const goNext = () =>
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));

  if (safeImages.length === 0) {
    return (
      <div className="relative flex aspect-[636/704] w-full items-center justify-center rounded-2xl bg-[#EFE7DA]">
        <span className="text-sm text-gray-500">
          No product image available
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#EFE7DA]">
      <div className="relative aspect-[636/704] w-full">
        <Image
          src={safeImages[activeIndex]}
          alt={`${productName} – image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 636px"
          className="object-cover"
        />

        {/* {badge && (
          <Badge className="absolute left-4 top-4 rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-medium text-[#3F3A36] hover:bg-[#F4EFE6]">
            {badge}
          </Badge>
        )} */}

        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setIsFavorited((v) => !v)}
          className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/90 hover:bg-white"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isFavorited ? 'fill-[#3F3A36] text-[#3F3A36]' : 'text-[#3F3A36]',
            )}
          />
        </Button>

        {safeImages.length > 1 && (
          <>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 text-[#3F3A36]" />
            </Button>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-4 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 text-[#3F3A36]" />
            </Button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="flex justify-center gap-1.5 py-3">
          {safeImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === activeIndex
                  ? 'w-6 bg-[#3F3A36]'
                  : 'w-1.5 bg-[#3F3A36]/30',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
