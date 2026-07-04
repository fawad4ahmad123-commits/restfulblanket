import Categories from '@/src/components/categories';
import { getBestSellers, getCategories } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';

interface Props {
  params: Promise<{
    slug: string;
  }>;
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
