'use client';

import { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { WishlistGrid } from './wishlist-grid';
import { WishlistSort } from './wishlist-sort';
import { WishlistHeader } from './wishlist-header';
import { WishlistProduct } from '@/src/core/context/wishlist-provider';
import { ExtendedWishlistCardProps } from './type';

interface WishlistProps {
  products: WishlistProduct[];
  sortValue: string;
  setSortValue: (value: string) => void;
}
export default function Wishlist({
  products,
  sortValue,
  setSortValue,
}: WishlistProps) {
  const mappedProducts: ExtendedWishlistCardProps[] = products.map((p) => ({
    id: p.id,
    title: p.name,
    price: p.price,
    image: p.image,
    slug: p.slug ?? p.id,
    hoverImage: p.hoverImage,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    weight: p.weight,
    dimensions: p.size,
    color: p.color,
    size: p.size,
    badge: p.badge,
    isProduct: true,
  }));

  const sortedItems = useMemo(() => {
    const items = [...mappedProducts];

    switch (sortValue) {
      case 'price-asc':
        return items.sort((a, b) => Number(a.price) - Number(b.price));

      case 'price-desc':
        return items.sort((a, b) => Number(b.price) - Number(a.price));

      case 'rating':
        return items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

      default:
        return items;
    }
  }, [products, sortValue]);

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-10 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <WishlistHeader itemCount={sortedItems.length} />
          <WishlistSort value={sortValue} onChange={setSortValue} />
        </div>

        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3EBE4]">
              <Heart className="h-9 w-9 text-[#A38575]" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-[#35281E]">
                Din ønskeliste er tom
              </h2>
              <p className="max-w-sm text-sm text-[#392A22]/70">
                Klik på hjerteikonet på et produkt eller i kurven for at gemme
                det her til senere.
              </p>
            </div>
            <a
              href="/shop"
              className="rounded-full bg-[#35281E] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5a3e2f]"
            >
              Udforsk produkter
            </a>
          </div>
        ) : (
          <WishlistGrid items={sortedItems} />
        )}
      </div>
    </main>
  );
}
