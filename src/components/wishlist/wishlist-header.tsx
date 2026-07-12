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
          Hjem
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#35281E]">Ønskeliste</span>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl text-[#35281E]">Ønskeliste</h1>
        <p className="text-sm text-[#392A22]">
          Alt hvad du har lagt til side til en roligere nat. Intet her
          forsvinder, før du selv bestemmer det.
        </p>
      </div>

      <p className="text-sm text-[#35281E]">
        {itemCount} {itemCount === 1 ? 'vare gemt' : 'varer gemt'}
      </p>
    </div>
  );
}
