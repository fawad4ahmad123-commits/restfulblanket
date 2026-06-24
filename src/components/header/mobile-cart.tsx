import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const MobileCart = ({ cartCount }: { cartCount: number }) => {
  return (
    <Button className="h-8 rounded-full border border-white/20 bg-[#392A22] px-3 text-xs text-white hover:bg-[#4A382E]">
      <span className="relative mr-1.5">
        <ShoppingBag className="h-3.5 w-3.5" />
      </span>
      Vogn{cartCount > 0 && ` - ${cartCount}`}
    </Button>
  );
};

export default MobileCart;
