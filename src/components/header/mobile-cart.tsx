import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface MobileCartProps {
  cartCount: number;
  onClick?: () => void;
}

const MobileCart = ({ cartCount, onClick }: MobileCartProps) => {
  return (
    <Button
      onClick={onClick}
      aria-label={`Open shopping cart${cartCount > 0 ? ` with ${cartCount} items` : ''}`}
      title="Shopping cart"
      className="relative h-8 w-8 rounded-full border border-white/20 bg-[#392A22] p-0 text-white hover:bg-[#4A382E] flex items-center justify-center"
    >
      <div className="relative">
        <ShoppingBag aria-hidden="true" className="h-4 w-4" />
        {cartCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFF9F5] text-[10px] font-semibold text-[#392A22]"
          >
            {cartCount}
          </span>
        )}
      </div>
    </Button>
  );
};

export default MobileCart;
