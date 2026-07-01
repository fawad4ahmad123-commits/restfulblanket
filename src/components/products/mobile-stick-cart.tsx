'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Truck, ShieldCheck, Clock3 } from 'lucide-react';

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
  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 lg:hidden transition-all duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-20 opacity-0',
      )}
    >
      <div className="rounded-[28px] bg-[#FDF9F6] p-4 shadow-2xl">
        <div className="mb-4 grid grid-cols-3 overflow-hidden rounded-[20px] border border-[#E8DDD4] bg-[#F8F2ED]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-[#E8DDD4] px-2 py-3 text-center">
            <Truck className="h-4 w-4 text-[#35281E]" />
            <span className="text-xs text-[#6F6258]">Free delivery</span>
            <span className="text-sm font-medium text-[#35281E]">
              Over kr 350
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 border-r border-[#E8DDD4] px-2 py-3 text-center">
            <ShieldCheck className="h-4 w-4 text-[#35281E]" />
            <span className="text-xs text-[#6F6258]">Secure</span>
            <span className="text-sm font-medium text-[#35281E]">Payment</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-center">
            <Clock3 className="h-4 w-4 text-[#35281E]" />
            <span className="text-xs text-[#6F6258]">5-7 days</span>
            <span className="text-sm font-medium text-[#35281E]">Delivery</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Product image — always visible */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white md:h-20 md:w-20">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Name + price — hidden on small, shown on md+ */}
          <div className="hidden min-w-0 flex-1 md:block">
            <h3 className="truncate font-serif text-2xl text-[#35281E]">
              {product.name}
            </h3>
            <p className="text-xl text-[#6F6258]">
              {product.currency}
              {product.price}
            </p>
          </div>

          {/* Spacer on small screens to push button to the right */}
          <div className="flex-1 md:hidden" />

          {/* Button — fixed width, never stretches */}
          <Button
            onClick={onAddToCart}
            className="h-10 shrink-0 rounded-full bg-[#35281E] px-5 text-sm text-white hover:bg-[#35281E]/90 md:h-11 md:px-6"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCart;
