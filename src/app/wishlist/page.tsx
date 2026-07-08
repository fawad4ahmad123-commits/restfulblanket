'use client';

import { useState } from 'react';
import Wishlist from '@/src/components/wishlist';
import { useWishlist } from '@/src/core/context/wishlist-provider';

const WishlistPage = () => {
  const [sortValue, setSortValue] = useState('price-asc');
  const { wishlistItems } = useWishlist();
  console.log('t1 : ', wishlistItems);
  return (
    <Wishlist
      products={wishlistItems}
      sortValue={sortValue}
      setSortValue={setSortValue}
    />
  );
};

export default WishlistPage;
