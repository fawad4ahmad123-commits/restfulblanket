import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface WishlistHeaderProps {
  itemCount: number;
}

export function WishlistHeader({ itemCount }: WishlistHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-xs text-[#392A22]">
        <Link href="/" className="text-[#392A22]">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#35281E]">Wishlist</span>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl text-[#35281E]">Wishlist</h1>
        <p className="text-sm text-[#392A22]">
          Everything you&apos;ve set aside for a calmer night. Nothing here
          disappears until you say so.
        </p>
      </div>

      <p className="text-sm text-[[#35281E]]">{itemCount} items saved</p>
    </div>
  );
}
