import ShopPageClient from '@/src/components/all-products';
import { getAllProducts } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';

const ShopPage = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const { slug = [] } = await params;

  const allProductData = await getAllProducts();
  const response = formatProducts(allProductData);

  return <ShopPageClient initialData={response} categorySlug={slug} />;
};

export default ShopPage;
