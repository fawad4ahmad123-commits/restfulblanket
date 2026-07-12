import Categories from '@/src/components/categories';
import { getBestSellers, getCategories } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';
import { getRankMathSEO } from '@/src/lib/seo';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slug}`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] || `${slug} | Tap Book Me`;

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    `Explore our ${slug} collection.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getBestSellers(),
    getCategories(),
  ]);

  return (
    <div className="bg-[#fdf9f6]">
      <Categories
        products={formatProducts(products)}
        categories={categories}
        initialSlug={slug}
      />
    </div>
  );
}
