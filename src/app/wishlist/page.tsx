'use client';

import { useEffect, useState } from 'react';
import Wishlist from '@/src/components/wishlist';
import {
  WishlistProduct,
  useWishlist,
} from '@/src/core/context/wishlist-provider';
import { Loader } from '@/src/components/loader';

const WishlistPage = () => {
  const [sortValue, setSortValue] = useState('price-asc');
  const { wishlistItems } = useWishlist();

  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          setProducts(wishlistItems);
          return;
        }

        const response = await fetch('/api/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const data = await response.json();

        const apiItems = data.items || data || [];
        const merged = [...wishlistItems];

        apiItems.forEach((item: WishlistProduct) => {
          const exists = merged.some(
            (wishlistItem) => wishlistItem.id === item.id,
          );

          if (!exists) {
            merged.push(item);
          }
        });

        setProducts(merged);
      } catch (error) {
        console.error('Wishlist fetch error:', error);
        setProducts(wishlistItems);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [wishlistItems]);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Wishlist
      products={products}
      sortValue={sortValue}
      setSortValue={setSortValue}
    />
  );
};

export default WishlistPage;