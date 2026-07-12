'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileViewMenuToggle from './mobile-menu-toggle';
import TopBar from './top-bar';
import Navigation from './navigation';
import SearchProducts from './search';
import MobileCart from './mobile-cart';
import { TrustBar } from '../trustbar';
import CartOffcanvas from '../cart';
import { cn } from '@/lib/utils';
import { useCart } from '@/src/core/context/card-Provider';
import { Courgette } from 'next/font/google';
import { useAuth } from '@/src/core/context/auth-context';
import { useWishlist } from '@/src/core/context/wishlist-provider';

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
});

const getInitials = (name?: string) =>
  name
    ? name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : '';

const SiteHeader = () => {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname.startsWith('/shop');
   const router = useRouter();
  const { wishlistIds } = useWishlist();
  const wishlistCount = wishlistIds.length;
  const { user, isAuthenticated } = useAuth();
  console.log("t56", { isHome })
  const {
    items,
    upsellItems,
    isOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    addUpsellToCart,
    getTotalItems,
  } = useCart();

  const cartCount = getTotalItems();

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
              <span className="sr-only">RestfulBlanket Home</span>
              <h3
                className={`${courgette.className} ${isHome ? 'text-white' : 'bg-[#FFF9F5] text-[#35281E]'} pt-3 text-center text-2xl leading-8`}
              >
                RestfulBlanket
              </h3>
            </Link>

            <Navigation isHome={isHome} />

            <div className="hidden items-center gap-1 lg:flex">
              <SearchProducts isHome={isHome} />

              <Button
                size="icon"
                variant="ghost"
                aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
                title="Wishlist"
                onClick={() => router.push('/wishlist')}
                className={cn(
                  'relative cursor-pointer',
                  !isHome && 'text-[#392A22] hover:bg-[#392A22]/10',
                )}
              >
                <Heart aria-hidden="true" className="size-4 cursor-pointer" />

                {wishlistCount > 0 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold cursor-pointer',
                      isHome
                        ? 'bg-[#F5F0EB] text-[#392A22]'
                        : 'bg-[#392A22] text-[#FFF9F5]',
                    )}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {isAuthenticated ? (
                <Link
                  href="/profile"
                  aria-label={`${user?.name} profile`}
                  title="My profile"
                  className={cn(
                    'flex items-center gap-2 rounded-full px-2 py-1 transition-colors',
                    !isHome && 'hover:bg-[#392A22]/10',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                      isHome
                        ? 'bg-white/20 text-white'
                        : 'bg-[#392A22] text-[#FFF9F5]',
                    )}
                  >
                    {getInitials(user?.name)}
                  </span>
                  <span className="hidden flex-col leading-tight xl:flex">
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isHome ? 'text-white' : 'text-[#392A22]',
                      )}
                    >
                      {user?.name}
                    </span>
                    <span
                      className={cn(
                        'text-xs',
                        isHome ? 'text-white/60' : 'text-[#392A22]/50',
                      )}
                    >
                      Restful Member
                    </span>
                  </span>
                </Link>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Sign in or manage account"
                  title="My account"
                  onClick={() => router.push('/signin')}
                  className={cn(
                    !isHome && 'text-[#392A22] hover:bg-[#392A22]/10',
                  )}
                >
                  <User aria-hidden="true" className="size-4" />
                </Button>
              )}

              <Button
                onClick={() => setCartOpen(true)}
                aria-label={`Open shopping cart${cartCount > 0 ? ` with ${cartCount} items` : ''}`}
                title="Shopping cart"
                className={cn(
                  'relative h-8 w-8 rounded-full border p-0 hover:bg-[#4A382E] flex items-center justify-center',
                  isHome
                    ? 'border-white/20 bg-[#392A22] text-white'
                    : 'border-[#392A22]/20 bg-[#392A22] text-[#FFF9F5]',
                )}
              >
                <div className="relative">
                  <ShoppingBag className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFF9F5] text-[10px] font-semibold text-[#392A22]"
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
              </Button>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <SearchProducts isHome={isHome} />
              <Button
                size="icon"
                variant="ghost"
                aria-label="My account"
                title="My account"
                onClick={() => router.push('/signin')}
                className={cn(
                  !isHome && 'text-[#392A22] hover:bg-[#392A22]/10',
                )}
              >
                <User aria-hidden="true" className="size-4" />
              </Button>
              <MobileCart
                cartCount={cartCount}
                onClick={() => setCartOpen(true)}
              />
              <MobileViewMenuToggle wishlistCount={wishlistCount} />
            </div>
          </div>
        </nav>
      </header>

      <TrustBar isHome={isHome} />

      <CartOffcanvas
        open={isOpen}
        onOpenChange={setCartOpen}
        items={items}
        upsellItems={upsellItems}
        onRemoveItem={removeFromCart}
        onChangeQty={updateQuantity}
        onAddUpsell={addUpsellToCart}
        onApplyDiscount={(code) => console.log(code)}
        onCheckout={() => router.push('/checkout')}
        onContinueShopping={() => setCartOpen(false)}
      />
    </>
  );
};

export default SiteHeader;
