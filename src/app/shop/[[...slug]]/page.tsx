import ShopPageClient from '@/src/components/all-products';
import { getAllProducts } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) => {
  const params = await searchParams;

  const allProductData = await getAllProducts();
  const response = formatProducts(allProductData);

  return (
    <ShopPageClient initialData={response} categorySlug={params.slug ?? ''} />
  );
};

export default ShopPage;
