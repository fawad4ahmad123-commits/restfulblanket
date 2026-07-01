'use client';
import { useMemo, useState } from 'react';
import { WishlistGrid } from './wishlist-grid';
import { WishlistSort } from './wishlist-sort';
import { WishlistHeader } from './wishlist-header';
import { wishlistItems } from './constants';

export default function WishlistPage() {
  const [sortValue, setSortValue] = useState('price-asc');

  const sortedItems = useMemo(() => {
    const items = [...wishlistItems];
    switch (sortValue) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [sortValue]);

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-10 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <WishlistHeader itemCount={sortedItems.length} />
          <WishlistSort value={sortValue} onChange={setSortValue} />
        </div>

        <WishlistGrid items={sortedItems} />
      </div>
    </main>
  );
}
