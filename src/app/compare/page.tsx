import { BreadcrumbNav } from '@/src/components/compare/bread-crumbs';
import { ProductCard } from '@/src/components/compare/compare-product-card';
import { SpecComparisonTable } from '@/src/components/compare/comparison-table';
import { getProductBySlug } from '@/src/lib/products';
import { formatWooProducts } from '@/src/utilty/compare-product-formater';

interface ComparePageProps {
  searchParams: Promise<{
    slug?: string | string[];
  }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;

  const slugs = Array.isArray(params.slug)
    ? params.slug
    : params.slug
      ? [params.slug]
      : [];

  const rawProducts = await Promise.all(
    slugs.map((slug) => getProductBySlug(slug)),
  );

  const products = formatWooProducts(rawProducts);

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-10 md:px-16 md:py-14">
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav />

        <h1 className="mt-4 font-serif text-4xl text-[#35281E] md:text-5xl">
          Compare products
        </h1>

        <section
          className={
            products.length >= 4
              ? 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
              : products.length === 3
                ? 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3'
                : 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2'
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        <section className="mt-10">
          <SpecComparisonTable products={products} />
        </section>
      </div>
    </main>
  );
}
