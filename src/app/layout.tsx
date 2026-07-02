import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import MainLayout from '../core/Mainlayouts';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '../core/context/cart-context';
import { CategoryProvider } from '../core/context/category-provider';
import { getBestSellers, getCategories } from '../lib/products';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
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

  return (
    <html
      lang="en"
      className={cn('font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <CategoryProvider categories={categories} products={products}>
          <CartProvider>
            <MainLayout>
              {children}
              <Toaster />
            </MainLayout>
          </CartProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
