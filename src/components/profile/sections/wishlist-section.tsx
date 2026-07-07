'use client';

import { Heart, Star, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { WISHLIST_ITEMS } from '../constants/profile-data';

export function WishlistSection() {
  return (
    <div>
      <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
        Your <span className={profileClasses.serifItalic}>Wishlist</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        Saved for next time, when a little more peace needs to be created
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WISHLIST_ITEMS.map((item) => (
          <div
            key={item.id}
            className={cn(profileClasses.surfaceCard, 'overflow-hidden')}
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              {item.bestSeller && (
                <span className="absolute left-3 top-3 rounded-full bg-[#2B2420] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Best Seller
                </span>
              )}
              <button
                type="button"
                aria-label="Remove from wishlist"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
              >
                <Heart className="h-4 w-4 text-[#2B2420] fill-[#2B2420]" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3.5 w-3.5 fill-[#2B2420] text-[#2B2420]" />
                <span
                  className={cn(
                    'text-xs font-medium',
                    profileClasses.textPrimary,
                  )}
                >
                  {item.rating}
                </span>
                <span className={cn('text-xs', profileClasses.textSecondary)}>
                  ({item.reviewCount.toLocaleString()})
                </span>
              </div>

              <h3
                className={cn(
                  'text-sm font-medium mb-0.5',
                  profileClasses.textPrimary,
                )}
              >
                {item.name}
              </h3>
              <p className={cn('text-xs mb-3', profileClasses.textSecondary)}>
                {item.dimensions}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    profileClasses.textPrimary,
                  )}
                >
                  {item.currency}
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-xs line-through text-[#8B7E70]">
                    {item.currency}
                    {item.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button className={cn(profileClasses.buttonDark, 'flex-1')}>
                  Add To Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-[#EAE1D3] shrink-0"
                  aria-label="Save for later"
                >
                  <Bookmark className="h-4 w-4 text-[#2B2420]" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
