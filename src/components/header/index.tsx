"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TrustBar } from "../trustbar";
import { navigation } from "../constant";

export default function SiteHeader() {
  const wishlistCount = 3;
  const cartCount = 2;

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-[#392A22]">
        <div className="mx-auto flex h-8 items-center justify-center px-4 text-[11px] uppercase tracking-widest gap-3">
          <Truck className="h-5 w-5 text-white" />
          Gratis CO₂-neutral fragt over €120
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/home/span.font-heading.png"
              alt="RestfulBlanket"
              width={153}
              height={32}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm hover:text-white/70"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-1">
            <Button size="icon" variant="ghost">
              <Search className="size-4" />
            </Button>

            {/* Wishlist with count */}
            <Button size="icon" variant="ghost" className="relative">
              <Heart className="size-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button size="icon" variant="ghost">
              <User className="size-4" />
            </Button>

            {/* Cart Button with count on icon */}
            <Button className="h-8 rounded-full border border-white/20 bg-[#392A22] px-4 text-xs text-white hover:bg-[#4A382E]">
              <span className="relative mr-2">
                <ShoppingBag className="h-3.5 w-3.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]">
                    {cartCount}
                  </span>
                )}
              </span>
              Vogn
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            {/* Mobile Cart Button */}
            <Button className="h-8 rounded-full border border-white/20 bg-[#392A22] px-3 text-xs text-white hover:bg-[#4A382E]">
              <span className="relative mr-1.5">
                <ShoppingBag className="h-3.5 w-3.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]">
                    {cartCount}
                  </span>
                )}
              </span>
              Vogn
            </Button>

            {/* Mobile Menu Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px]">
                <div className="mt-10 flex flex-col gap-5">
                  {/* Mobile Nav Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-base font-medium text-foreground hover:text-foreground/70 border-b pb-3"
                    >
                      {item.title}
                    </Link>
                  ))}

                  {/* Mobile Extra Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button size="icon" variant="ghost" className="relative">
                      <Heart className="size-5" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]">
                          {wishlistCount}
                        </span>
                      )}
                    </Button>

                    <Button size="icon" variant="ghost">
                      <Search className="size-5" />
                    </Button>

                    <Button size="icon" variant="ghost">
                      <User className="size-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>

      <TrustBar />
    </header>
  );
}