import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SearchProducts = ({ isHome = true }: { isHome?: boolean }) => {
  return (
    <Button
      asChild
      size="icon"
      variant="ghost"
      aria-label="Search products"
      title="Search products"
      className={cn(!isHome && 'text-[#392A22] hover:bg-[#392A22]/10')}
    >
      <Link href="/search">
        <Search aria-hidden="true" className="size-4" />
      </Link>
    </Button>
  );
};

export default SearchProducts;
