import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import MobileView from './mobile-view';

const MobileViewMenuToggle = ({ wishlistCount }: { wishlistCount: number }) => {
  return (
    <Sheet>
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
        className="fixed top-4 right-4 bottom-4 w-[92vw] max-w-[360px] bg-white p-6 shadow-2xl border-none outline-none flex flex-col text-[#35281E]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E9DDD4]/60 shrink-0">
          <span className="font-serif italic text-xl font-normal text-[#35281E]">
            RestfulBlanket
          </span>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#35281E] hover:bg-stone-100 rounded-full flex items-center justify-center"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-hide flex flex-col">
          <MobileView wishlistCount={wishlistCount} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileViewMenuToggle;
