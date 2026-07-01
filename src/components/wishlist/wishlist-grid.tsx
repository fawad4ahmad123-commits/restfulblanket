'use client';

import { WishlistItem } from './type';
import { WishlistCard } from './wishlist-card';

interface WishlistGridProps {
  items: WishlistItem[];
}

export function WishlistGrid({ items }: WishlistGridProps) {
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
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <WishlistCard
          key={item.id}
          item={item}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          onCompare={handleCompare}
        />
      ))}
    </div>
  );
}
