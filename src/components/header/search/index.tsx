import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SearchProducts = ({ isHome = true }: { isHome?: boolean }) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="Search products"
      title="Search products"
      className={cn(!isHome && 'text-[#392A22] hover:bg-[#392A22]/10')}
    >
      <Search aria-hidden="true" className="size-4" />
    </Button>
  );
};

export default SearchProducts;
