'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileViewMenuToggle from './mobile-menu-toggle';
import TopBar from './top-bar';
import Navigation from './navigation';
import SearchProducts from './search';
import MobileCart from './mobile-cart';
import { TrustBar } from '../trustbar';
import { cn } from '@/lib/utils';

const SiteHeader = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const wishlistCount = 3;
  const cartCount = 2;

  return (
    <>
      <header
        className={cn(
          'inset-x-0 top-0 z-50',
          isHome ? 'absolute text-white' : 'relative text-[#392A22]',
        )}
      >
        <TopBar />

        <nav
          aria-label="Primary navigation"
          className={cn(
            'relative z-[100] border-b backdrop-blur-md',
            isHome
              ? 'border-white/10 bg-black/20'
              : 'border-[#392A22]/10 bg-[#FFF9F5]',
          )}
        >
          <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 lg:px-6">
            <Link
              href="/"
              aria-label="RestfulBlanket Home"
              title="RestfulBlanket Home"
            >
              <Image
                src="/home/span.font-heading.png"
                alt="RestfulBlanket"
                width={153}
                height={32}
                priority
                className={isHome ? '' : 'brightness-0 invert-0'}
              />
            </Link>

            <Navigation isHome={isHome} />

            <div className="hidden items-center gap-1 lg:flex">
              <SearchProducts isHome={isHome} />

              <Button
                size="icon"
                variant="ghost"
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
                title="Wishlist"
                className={cn(
                  'relative',
                  !isHome && 'text-[#392A22] hover:bg-[#392A22]/10',
                )}
              >
                <Heart aria-hidden="true" className="size-4" />
                {wishlistCount > 0 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold',
                      isHome
                        ? 'bg-[#F5F0EB] text-[#392A22]'
                        : 'bg-[#392A22] text-[#FFF9F5]',
                    )}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                aria-label="My account"
                title="My account"
                className={cn(
                  !isHome && 'text-[#392A22] hover:bg-[#392A22]/10',
                )}
              >
                <User aria-hidden="true" className="size-4" />
              </Button>

              <Button
                aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
                title="Shopping cart"
                className={cn(
                  'h-8 rounded-full border px-4 text-xs hover:bg-[#4A382E]',
                  isHome
                    ? 'border-white/20 bg-[#392A22] text-white'
                    : 'border-[#392A22]/20 bg-[#392A22] text-[#FFF9F5]',
                )}
              >
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
      <TrustBar isHome={isHome} />
    </>
  );
};

export default SiteHeader;
