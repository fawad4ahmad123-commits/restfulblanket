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

  const [product, data] = await Promise.all([
    getProductBySlug(slug),
    getRankMathSEO(),
  ]);

  const seo = data?.seo;
  console.log("t12 single product seo", { seo })
  const title =
    seo?.title ||
    product?.name ||
    "Product";

  const description =
    seo?.description ||
    product?.description
      ?.replace(/<[^>]+>/g, "")
      .slice(0, 160) ||
    "Premium sleep products";

  return {
    title,

    description,

    alternates: {
      canonical:
        seo?.canonical ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
    },

    openGraph: {
      title:
        seo?.openGraph?.title ||
        title,

      description:
        seo?.openGraph?.description ||
        description,

      url:
        seo?.openGraph?.url ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,

      images:
        seo?.openGraph?.image
          ? [
            {
              url: seo.openGraph.image,
            },
          ]
          : product?.images?.[0]?.src
            ? [
              {
                url: product.images[0].src,
              },
            ]
            : [],
    },

    twitter: {
      card: "summary_large_image",

      title:
        seo?.twitter?.title ||
        title,

      description:
        seo?.twitter?.description ||
        description,

      images:
        seo?.twitter?.image
          ? [seo.twitter.image]
          : product?.images?.[0]?.src
            ? [product.images[0].src]
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
