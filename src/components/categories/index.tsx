'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlanketHeader } from '@/src/components/categories/blanket-header';
import { CategoryTabs } from '@/src/components/categories/category-tabs';
import ComparisonSection from '@/src/components/categories/comparison-section';
import { ProductGrid } from '@/src/components/categories/product-grid';
import ProductCategories from '@/src/components/Home/product-categories';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import CategorySidebar from './category-sidebar';
import { Pagination } from '../all-products/Pagination';
import ActiveFilters from '../all-products/ProductGrid/ActiveFilters';
import { FAQS } from './faqs';

const ITEMS_PER_PAGE = 6;

export default function Categories({ products, categories, initialSlug }: any) {
  const router = useRouter();
  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialSlug ? [initialSlug] : [],
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (cats: string[]) => {
    setActiveCategories(cats);
    setCurrentPage(1);

    if (cats.length === 1) {
      router.push(`/categories/${cats[0]}`);
    } else if (cats.length === 0) {
      router.push('/categories');
    }
  };

  const filteredProducts = useMemo(() => {
    if (activeCategories.length === 0) return products;

    return products.filter((product: any) =>
      product.categories?.some((catName: string) => {
        const match = categories.find((c: any) => c.name === catName);

        return match && activeCategories.includes(match.slug);
      }),
    );
  }, [activeCategories, products, categories]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const filters = useMemo(() => {
    return activeCategories.map((slug) => {
      const cat = categories.find((c: any) => c.slug === slug);

      return {
        label: cat?.name || slug,
        clear: () =>
          handleCategoryChange(activeCategories.filter((c) => c !== slug)),
      };
    });
  }, [activeCategories, categories]);

  const overallRating = useMemo(() => {
    if (!products?.length) return { rating: 0, reviewCount: 0 };

    const totalReviews = products.reduce(
      (sum: number, p: any) => sum + (p.reviewCount || 0),
      0,
    );

    if (totalReviews === 0) return { rating: 0, reviewCount: 0 };

    const weightedSum = products.reduce(
      (sum: number, p: any) => sum + (p.rating || 0) * (p.reviewCount || 0),
      0,
    );

    return {
      rating: Number((weightedSum / totalReviews).toFixed(1)),
      reviewCount: totalReviews,
    };
  }, [products]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BlanketHeader
        rating={overallRating.rating}
        reviewCount={overallRating.reviewCount}
      />

      <div className="mt-8">
        <CategoryTabs
          categories={categories}
          activeCategories={activeCategories}
          onSelect={(slug: string) =>
            handleCategoryChange(
              activeCategories.includes(slug)
                ? activeCategories.filter((s) => s !== slug)
                : [...activeCategories, slug],
            )
          }
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-[260px_1fr]">
        <CategorySidebar
          categories={categories}
          activeCategories={activeCategories}
          setActiveCategories={handleCategoryChange}
        />

        <div>
          <ActiveFilters filters={filters} />

          <div className="pl-[6px]">
            <ProductGrid products={paginatedProducts} />
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      <TestimonialVideoSlider isCategory={true} />
      <ComparisonSection />
      <FAQS />
      <ProductCategories response_categories={categories} isCategory={true} />
    </main>
  );
}
