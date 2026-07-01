import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  subtotal: number;
  onCheckout: () => void;
}

export default function CartFooter({ subtotal, onCheckout }: Props) {
  return (
    <div className="border-t border-stone-200 px-4 py-3.5 md:px-6 md:py-4">
      <div className="flex items-start justify-between text-sm md:text-base">
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-stone-900">Subtotal</span>
          <p className="mt-0.5 text-[10px] md:text-xs text-[#6B6B6B] leading-tight">
            Shipping & taxes may be re-calculated at checkout
          </p>
        </div>

        <span className="font-semibold text-stone-900 shrink-0 ml-4">
          kr{subtotal.toFixed(2)}
        </span>
      </div>
      <Button
        onClick={onCheckout}
        className="mt-3.5 md:mt-4 h-[44px] md:h-[56px] w-full cursor-pointer rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 text-xs md:text-base font-semibold text-white"
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
      </Button>
    </div>
  );
}
