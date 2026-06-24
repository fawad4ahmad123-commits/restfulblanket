import Footer from '@/src/components/footer';
import SiteHeader from '@/src/components/header';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
