'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      <div className="flex items-center gap-4 rounded-[24px] bg-[#3D2B1F] p-4 shadow-2xl">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-2xl text-white">
            {product.name}
          </h3>

          <p className="text-xl text-[#E6D9CF]">
            {product.currency}
            {product.price}
          </p>
        </div>

        <Button
          onClick={onAddToCart}
          className="h-14 rounded-full bg-white px-6 text-lg text-[#3D2B1F] hover:bg-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
export default MobileStickyCart;
