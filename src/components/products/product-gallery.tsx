'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/src/core/context/wishlist-provider';

interface ProductGalleryProps {
  images?: string[];
  badge?: string;
  productName?: string;
  data: any;
  videoUrl?: string;
}

const SWIPE_THRESHOLD = 50;

const ProductGallery = ({
  images = [],
  badge,
  productName = 'Product',
  data,
  videoUrl,
}: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const {
    id,
    title,
    price,
    image,
    slug,
    hoverImage,
    originalPrice,
    rating,
    reviewCount,
    weight,
    dimensions,
    color,
    size,
  } = data || {};

  const wished = isWishlisted(String(id));
  const safeImages =
    Array.isArray(images) && images.length > 0 ? images : [image];

  // Total slides = images + optional video at the end
  const hasVideo = Boolean(videoUrl);
  const totalSlides = safeImages.length + (hasVideo ? 1 : 0);
  const videoSlideIndex = hasVideo ? safeImages.length : -1;
  const isVideoSlide = activeIndex === videoSlideIndex;

  // Auto-play / pause video when slide changes
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoSlide) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isVideoSlide]);

  const goPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const goNext = () =>
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  const pointerStartX = React.useRef<number | null>(null);
  const pointerDeltaX = React.useRef(0);
  const isDragging = React.useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (totalSlides <= 1) return;
    pointerStartX.current = e.clientX;
    pointerDeltaX.current = 0;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || pointerStartX.current === null) return;
    pointerDeltaX.current = e.clientX - pointerStartX.current;
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = pointerDeltaX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
  };

  if (safeImages.length === 0 || !safeImages[0]) {
    return (
      <div className="relative flex aspect-[636/704] w-full items-center justify-center rounded-2xl bg-[#EFE7DA]">
        <span className="text-sm text-gray-500">
          Ingen produktbillede tilgængeligt
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#EFE7DA]">
      <div
        className="relative aspect-[636/704] w-full touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {/* ── Image slides ── */}
        {safeImages.map((src, i) => (
          <div
            key={src + i}
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              i === activeIndex
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none',
            )}
          >
            <Image
              src={src}
              alt={`${productName} – image ${i + 1}`}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
              className="object-cover pointer-events-none"
            />
          </div>
        ))}

        {/* ── Video slide ── */}
        {hasVideo && (
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300 flex items-center justify-center bg-black',
              isVideoSlide
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none',
            )}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="h-full w-full object-contain"
              style={{ maxHeight: '100%' }}
            />

            {/* Play overlay shown before interaction */}
            {!isVideoSlide && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg">
                  <Play className="h-7 w-7 fill-[#35281E] text-[#35281E] translate-x-0.5" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Wishlist button ── */}
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: String(id),
              name: title || productName,
              price: Number(price) || 0,
              image: image || safeImages[0],
              slug: slug || '',
              hoverImage: hoverImage || '',
              originalPrice: originalPrice ? Number(originalPrice) : undefined,
              rating: rating || 0,
              reviewCount: reviewCount || 0,
              weight: weight || '',
              dimensions: dimensions || '',
              color: color || '',
              size: size || '',
              badge: badge || '',
            });
          }}
          className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35281E] focus-visible:ring-offset-2"
        >
          <Heart
            size={16}
            aria-hidden="true"
            focusable="false"
            className={
              wished ? 'fill-[#35281E] text-[#35281E]' : 'text-[#35281E]'
            }
          />
          <span className="sr-only">
            {wished ? 'Remove from wishlist' : 'Add to wishlist'}
          </span>
        </button>

        {/* ── Prev / Next arrows ── */}
        {totalSlides > 1 && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white z-20"
          >
            <ChevronLeft className="h-4 w-4 text-[#3F3A36]" />
          </Button>
        )}

        {totalSlides > 1 && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Next image"
            onClick={goNext}
            className="absolute right-4 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white z-20"
          >
            <ChevronRight className="h-4 w-4 text-[#3F3A36]" />
          </Button>
        )}

        {/* ── Dot navigation ── */}
        {totalSlides > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 z-20">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className="flex h-12 w-12 items-center justify-center"
              >
                <span
                  className={cn(
                    'rounded-full transition-all',
                    i === activeIndex
                      ? 'h-2 w-6 bg-[#3F3A36]'
                      : 'h-2 w-2 bg-[#3F3A36]/30',
                  )}
                />
              </button>
            ))}

            {/* Video dot */}
            {hasVideo && (
              <button
                type="button"
                aria-label="Go to video"
                aria-current={isVideoSlide}
                onClick={() => setActiveIndex(videoSlideIndex)}
                className="flex h-12 w-12 items-center justify-center"
              >
                <span
                  className={cn(
                    'flex items-center justify-center rounded-full transition-all',
                    isVideoSlide
                      ? 'h-6 w-6 bg-[#3F3A36]'
                      : 'h-5 w-5 bg-[#3F3A36]/30',
                  )}
                >
                  <Play
                    className={cn(
                      'translate-x-px transition-all',
                      isVideoSlide
                        ? 'h-2.5 w-2.5 fill-white text-white'
                        : 'h-2 w-2 fill-[#3F3A36]/60 text-[#3F3A36]/60',
                    )}
                  />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
