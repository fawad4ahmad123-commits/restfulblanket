'use client';

import { useEffect, useState } from 'react';
import { Heart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { useWishlist } from '@/src/core/context/wishlist-provider';
import WishlistCard from '@/src/components/wishlist/wishlist-card';
import Link from 'next/link';

export function WishlistSection() {
  const { wishlistItems } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Only treat the wishlist as "available" when the user actually has an
  // auth_token. NOTE: the fetch itself happens inside useWishlist's provider —
  // if that provider fetches unconditionally on mount, add the same
  // `localStorage.getItem('auth_token')` check there before calling the API,
  // e.g.:
  //   useEffect(() => {
  //     const token = localStorage.getItem('auth_token');
  //     if (!token) return; // don't call the wishlist API when logged out
  //     fetchWishlist();
  //   }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('auth_token'));
  }, []);

  const totalItems = wishlistItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Safeguard currentPage if items are removed and page count shrinks
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = wishlistItems.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
        Your <span className={profileClasses.serifItalic}>Wishlist</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        Saved for next time, when a little more peace needs to be created
      </p>

      {!isLoggedIn ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#F0EBE6] p-6 sm:p-8 shadow-sm">
          <LogIn className="h-10 w-10 mx-auto text-[#8B7E70] mb-3 opacity-60" />
          <h3
            className={cn(
              'text-lg font-semibold mb-1',
              profileClasses.textPrimary,
            )}
          >
            Log ind for at se din ønskeliste
          </h3>
          <p
            className={cn(
              'text-sm mb-6 max-w-xs mx-auto',
              profileClasses.textSecondary,
            )}
          >
            Du skal være logget ind for at gemme og se dine favoritter.
          </p>
          <Link href="/signin">
            <Button className={profileClasses.buttonDark}>Log ind</Button>
          </Link>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#F0EBE6] p-6 sm:p-8 shadow-sm">
          <Heart className="h-10 w-10 mx-auto text-[#8B7E70] mb-3 opacity-60" />
          <h3
            className={cn(
              'text-lg font-semibold mb-1',
              profileClasses.textPrimary,
            )}
          >
            Din ønskeliste er tom
          </h3>
          <p
            className={cn(
              'text-sm mb-6 max-w-xs mx-auto',
              profileClasses.textSecondary,
            )}
          >
            Gå på opdagelse i vores produkter og gem dine favoritter her.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedItems.map((item) => (
              <WishlistCard
                key={item.id}
                id={item.id}
                title={item.name}
                price={item.price}
                image={item.image}
                slug={item.slug}
                hoverImage={item.hoverImage}
                originalPrice={item.originalPrice}
                rating={item.rating}
                reviewCount={item.reviewCount}
                weight={item.weight}
                dimensions={item.dimensions}
                color={item.color}
                size={item.size}
                badge={item.badge}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={activePage === 1}
                className="rounded-full border-[#EAE1D3] text-[#2B2420] hover:bg-[#F3ECE1] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Previous
              </Button>

              <div className="flex items-center gap-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'h-8 w-8 rounded-full text-xs font-semibold transition-all cursor-pointer',
                        activePage === page
                          ? 'bg-[#2B2420] text-white'
                          : 'text-[#2B2420] hover:bg-[#F3ECE1]',
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={activePage === totalPages}
                className="rounded-full border-[#EAE1D3] text-[#2B2420] hover:bg-[#F3ECE1] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
