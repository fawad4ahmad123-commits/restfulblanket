import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  subtotal: number;
  onCheckout: () => void;
}

export default function CartFooter({ subtotal, onCheckout }: Props) {
  return (
    <div className="border-t border-stone-200 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Subtotal</span>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Shipping & taxes may be re-calculated at checkout
          </p>
        </div>

        <span className="font-medium">kr{subtotal.toFixed(2)}</span>
      </div>
      <Button
        onClick={onCheckout}
        className="mt-4 h-[56px] w-full max-w-[448px] cursor-pointer rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100"
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
