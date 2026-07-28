'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Truck,
  ShieldCheck,
  Clock3,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface MobileStickyCartProps {
  visible: boolean;
  product: {
    name: string;
    price: number;
    currency: string;
    image?: string;
  };
  onAddToCart: () => void;
}

const MobileStickyCart = ({
  visible,
  product,
  onAddToCart,
}: MobileStickyCartProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 lg:hidden will-change-transform transition-all duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <div className="rounded-[28px] bg-[#fdf9f6] px-4 py-3 shadow-2xl">
        <div>
          <button
            type="button"
            aria-expanded={showInfo}
            aria-label={showInfo ? 'Hide information' : 'Show information'}
            title={showInfo ? 'Hide information' : 'Show information'}
            onClick={() => setShowInfo((prev) => !prev)}
            className="flex h-5 w-full items-center justify-center text-[#35281E]"
          >
            {showInfo ? (
              <ChevronUp aria-hidden="true" className="h-5 w-5" />
            ) : (
              <ChevronDown aria-hidden="true" className="h-5 w-5" />
            )}

            <span className="sr-only">
              {showInfo ? 'Hide information' : 'Show information'}
            </span>
          </button>

          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              showInfo ? 'max-h-[250px] opacity-100 mb-3' : 'max-h-0 opacity-0',
            )}
          >
            <div className="grid min-h-[96px] grid-cols-3 overflow-hidden rounded-[20px] border border-[#E8DDD4] bg-[#F8F2ED]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-[#E8DDD4] px-2 py-3 text-center">
                <Truck aria-hidden="true" className="h-4 w-4 text-[#35281E]" />
                <span className="text-xs text-[#6F6258]">Gratis levering</span>
                <span className="text-sm font-medium text-[#35281E]">
                  Over 350 kr.
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 border-r border-[#E8DDD4] px-2 py-3 text-center">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-[#35281E]"
                />
                <span className="text-xs text-[#6F6258]">Sikker</span>
                <span className="text-sm font-medium text-[#35281E]">
                  Betaling
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-center">
                <Clock3 aria-hidden="true" className="h-4 w-4 text-[#35281E]" />
                <span className="text-xs text-[#6F6258]">5-7 dage</span>
                <span className="text-sm font-medium text-[#35281E]">
                  Levering
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white md:h-20 md:w-20">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            )}
          </div>

          <div className="hidden min-w-0 flex-1 md:block">
            <h3 className="truncate font-serif text-2xl text-[#35281E]">
              {product.name}
            </h3>

            <p className="text-xl text-[#6F6258]">
              {product.currency}
              {product.price}
            </p>
          </div>

          <div className="flex-1 md:hidden" />

          <Button
            type="button"
            aria-label="Add product to cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="h-11 shrink-0 rounded-full bg-[#35281E] px-5 text-sm text-white hover:bg-[#35281E]/90 md:px-6"
          >
            Tilføj til kurv
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCart;
