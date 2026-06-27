import Shop from '@/src/components/all-products';
import ShopHero from '@/src/components/all-products/shop-Hero';

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <div className="bg-[#FDF9F6]">
        <Shop />
      </div>
    </>
  );
};
export default ShopPage;
