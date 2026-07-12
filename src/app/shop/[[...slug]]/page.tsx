import ShopPageClient from '@/src/components/all-products';
import { getAllProducts } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  const path = slug.length ? `/shop/${slug.join('/')}` : '/shop';

  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] || 'Shop | Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Explore our premium sleep products.';

  return {
    title,
    description,
  };
}

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
