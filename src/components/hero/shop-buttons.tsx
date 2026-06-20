import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ShopButtons = () => {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Link
        href="/shop"
        aria-label="Shop now and browse products"
        title="Shop now"
        className="flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#e6cfbb] px-6 text-sm text-[#392a22] transition hover:bg-[#e6cfbb]/90 md:h-[56px]"
      >
        <span>Shop Now</span>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#392a22] text-[#fff9f5]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4 rotate-180" />
        </span>
      </Link>

      <Button
        asChild
        variant="outline"
        className="h-[52px] rounded-full border-[#fff9f5] bg-transparent px-6 text-sm text-[#fff9f5] hover:bg-[#fff9f5] hover:text-black md:h-[56px]"
      >
        <Link
          href="/find-your-weight"
          aria-label="Find your perfect weighted blanket weight"
          title="Find Your Perfect Weight"
        >
          Find Your Perfect Weight
        </Link>
      </Button>
    </div>
  );
};

export default ShopButtons;
