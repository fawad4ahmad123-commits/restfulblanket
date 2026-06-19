import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileViewMenuToggle from "./mobile-menu-toggle";
import TopBar from "./top-bar";
import Navigation from "./navigation";
import SearchProducts from "./search";
import MobileCart from "./mobile-cart";
import { TrustBar } from "../trustbar";

const SiteHeader = () => {
  const wishlistCount = 3;
  const cartCount = 2;

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 text-white">
        <TopBar />

        <nav className="relative z-[100] border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 lg:px-6">
            <Link href="/">
              <Image
                src="/home/span.font-heading.png"
                alt="RestfulBlanket"
                width={153}
                height={32}
                priority
              />
            </Link>

            <Navigation />

            <div className="hidden items-center gap-1 lg:flex">
              <SearchProducts />

              <Button size="icon" variant="ghost" className="relative">
                <Heart className="size-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              <Button size="icon" variant="ghost">
                <User className="size-4" />
              </Button>

              <Button className="h-8 rounded-full border border-white/20 bg-[#392A22] px-4 text-xs text-white hover:bg-[#4A382E]">
                <span className="relative mr-2">
                  <ShoppingBag className="h-3.5 w-3.5" />
                </span>
                Vogn{cartCount > 0 && ` - ${cartCount}`}
              </Button>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <MobileCart cartCount={cartCount} />
              <MobileViewMenuToggle wishlistCount={wishlistCount} />
            </div>
          </div>
        </nav>
      </header>
      <TrustBar />
    </>
  );
};

export default SiteHeader;
