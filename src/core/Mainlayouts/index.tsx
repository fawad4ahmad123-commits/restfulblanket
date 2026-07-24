'use client';

import Footer from '@/src/components/footer';
import SiteHeader from '@/src/components/header';
import { usePathname } from 'next/navigation';
import AuthLayout from '../authayout';

interface SiteLayoutProps {
  children: React.ReactNode;
  products: any[];
  categories: any[];
}

const MainLayout = ({ children, products, categories }: SiteLayoutProps) => {
  const pathname = usePathname();
  const isHeader = ['/signup', '/checkout', '/signin'].includes(pathname);

  return (
    <>
      {isHeader ? (
        <AuthLayout />
      ) : (
        <SiteHeader products={products} categories={categories} />
      )}

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
