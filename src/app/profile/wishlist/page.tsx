import { Metadata } from 'next';
import WishlistPageClient from './wishlist-client';

export const metadata: Metadata = {
  title: 'Wishlist | My Account',
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
