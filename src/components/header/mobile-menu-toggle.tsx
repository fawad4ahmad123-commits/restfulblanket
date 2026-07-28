'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import MobileView from './mobile-view';

interface Props {
  wishlistCount: number;
  categories: any[];
  products: any[];
}

const MobileViewMenuToggle = ({
  wishlistCount,
  categories,
  products,
}: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open navigation menu"
          title="Open navigation menu"
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="fixed top-4 right-4 bottom-4 flex w-[92vw] max-w-[360px] flex-col border-none bg-white p-6 text-[#35281E] shadow-2xl outline-none"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#E9DDD4]/60 pb-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-serif text-xl font-normal italic text-[#35281E]"
          >
            RestfulBlanket
          </Link>

          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#35281E] hover:bg-stone-100"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div className="scrollbar-hide flex flex-1 flex-col overflow-y-auto py-2">
          <MobileView
            wishlistCount={wishlistCount}
            categories={categories}
            products={products}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileViewMenuToggle;
