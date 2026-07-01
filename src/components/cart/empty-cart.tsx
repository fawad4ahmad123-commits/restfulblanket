import { X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartHeader from './cart-header';

interface EmptyCartProps {
  onClose: () => void;
  onContinueShopping: () => void;
}

export default function EmptyCart({
  onClose,
  onContinueShopping,
}: EmptyCartProps) {
  return (
    <div className="flex h-full flex-col bg-[#FAF3EC]">
      <CartHeader title="Your Cart" />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 md:gap-5 px-4 md:px-6">
        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-stone-300 text-stone-400 shrink-0">
          <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        </div>

        <p className="font-serif text-base md:text-lg text-stone-900">
          Your cart is empty
        </p>

        <Button
          onClick={onContinueShopping}
          className="rounded-full h-[40px] md:h-[50px] px-5 md:px-6 text-xs md:text-sm font-medium text-white cursor-pointer bg-[#35281E] hover:bg-[#35281E] hover:opacity-100"
        >
          Continue shopping
          <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>
      </div>
    </div>
  );
}
