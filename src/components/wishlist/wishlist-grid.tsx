'use client';

import CompareBar from '../compare/compare-bar';
import { ExtendedWishlistCardProps } from './type';
import WishlistCard from './wishlist-card';

interface WishlistGridProps {
  items: ExtendedWishlistCardProps[];
}

export function WishlistGrid({ items }: WishlistGridProps) {
  console.log('t2 : ', items);
  const handleAddToCart = (id: string) => {
    console.log('Add to cart:', id);
  };

  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite:', id);
  };

  const handleCompare = (id: string) => {
    console.log('Compare:', id);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <WishlistCard
            key={item.id}
            {...item}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onCompare={handleCompare}
          />
        ))}
      </div>
      <CompareBar />
    </>
  );
}
