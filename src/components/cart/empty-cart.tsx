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

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-300 text-stone-400">
          <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <p className="font-serif text-lg text-stone-900">Your cart is empty</p>

        <Button
          onClick={onContinueShopping}
          className="rounded-full  px-6 py-5 text-sm font-medium text-white cursor-pointer  bg-[#35281E] hover:bg-[#35281E] hover:opacity-100"
        >
          Continue shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
