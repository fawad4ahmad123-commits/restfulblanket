'use client';
import Footer from '@/src/components/footer';
import SiteHeader from '@/src/components/header';
import { usePathname } from 'next/navigation';
import AuthLayout from '../authayout';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: SiteLayoutProps) => {
  const pathname = usePathname();
  const isHeader = ['/sign-up', '/checkout', '/sign-in'].includes(pathname);

  return (
    <>
      {isHeader ? <AuthLayout /> : <SiteHeader />}
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
