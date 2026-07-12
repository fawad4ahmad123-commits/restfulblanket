import { Suspense } from 'react';
import ProductContent from '@/src/components/products/product-main';
import {
  getBestSellers,
  getCategories,
  getProductBySlug,
} from '@/src/lib/products';
import { Loader } from '@/src/components/loader';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    product?.name ||
    'Product | Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    product?.description?.replace(/<[^>]+>/g, '').slice(0, 160) ||
    'Premium sleep products';

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: product?.images?.[0]?.src
        ? [
            {
              url: product.images[0].src,
            },
          ]
        : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [allProducts, product, categories] = await Promise.all([
    getBestSellers(),
    getProductBySlug(slug),
    getCategories(),
  ]);

  const relatedIds = product?.related_ids || [];

  const relatedProducts = allProducts.filter((item: any) =>
    relatedIds.some((id: number | string) => Number(id) === Number(item.id)),
  );

  return (
    <Suspense fallback={<Loader />}>
      <ProductContent
        likeProducts={relatedProducts}
        productResponse={product}
        categories={categories}
      />
    </Suspense>
  );
}
