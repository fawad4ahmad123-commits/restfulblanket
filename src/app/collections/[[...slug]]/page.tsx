import { getProductsByCategorySlug, getCategories } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';
import { getRankMathSEO } from '@/src/lib/seo';
import Categories from '@/src/components/categories';

interface Props {
  params: Promise<{
    slug: string | string[];
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slugStr}`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    `${slugStr} | Tap Book Me`;

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    `Explore our ${slugStr} collection.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slugStr}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategorySlug(slug),
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
