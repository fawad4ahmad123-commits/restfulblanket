import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileView from "./mobile-view";

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

      <SheetContent side="right" className="w-[280px]">
        <div className="mt-10 flex flex-col gap-5">
          <MobileView wishlistCount={wishlistCount} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileViewMenuToggle;
