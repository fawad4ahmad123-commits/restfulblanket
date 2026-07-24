import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { cn } from '@/lib/utils';
import './globals.css';

import MainLayout from '../core/Mainlayouts';

import { CartProvider } from '../core/context/cart-context';
import { CompareProvider } from '../core/context/compare-provider';
import { AuthProvider } from '../core/context/auth-context';
import { WishlistProvider } from '../core/context/wishlist-provider';
import { ProductMetaProvider } from '../core/context/product-meta-context';

import ClientProviders from '../components/client-providers';
import { getBestSellers, getCategories } from '../lib/products';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RestfulBlanket',
  description:
    'Hand-crafted weighted blankets and duvets designed for deeper sleep and relaxation.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, categories] = await Promise.all([
    getBestSellers(),
    getCategories(),
  ]);
  const formattedProducts = products.map((product: any) => ({
    id: product.id,
    title: product.name,
    href: `/product/${product.slug}`,
    image: product.images?.[0]?.src || '',
    categories: product.categories,
  }));

  return (
    <html
      lang="en"
      className={cn('font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AuthProvider>
          <ProductMetaProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  <MainLayout
                    products={formattedProducts}
                    categories={categories}
                  >
                    {children}
                    <ClientProviders />
                  </MainLayout>
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </ProductMetaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
