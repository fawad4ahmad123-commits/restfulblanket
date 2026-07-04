'use client';

import { useMemo, useState } from 'react';

import { BlanketHeader } from '@/src/components/categories/blanket-header';
import { CategoryTabs } from '@/src/components/categories/category-tabs';
import ComparisonSection from '@/src/components/categories/comparison-section';
import { ProductGrid } from '@/src/components/categories/product-grid';
import { FAQSection } from '@/src/components/expert/expert-detail/faq-Section';
import ProductCategories from '@/src/components/Home/product-categories';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import CategorySidebar from './category-sidebar';
import { Pagination } from '../all-products/Pagination';
import ActiveFilters from '../all-products/ProductGrid/ActiveFilters';

const ITEMS_PER_PAGE = 6;

export default function Categories({ products, categories }: any) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (categories: string[]) => {
    setActiveCategories(categories);
    setCurrentPage(1);
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
    const end = start + ITEMS_PER_PAGE;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const filters = useMemo(() => {
    return activeCategories.map((cat) => ({
      label: cat,
      clear: () =>
        handleCategoryChange(activeCategories.filter((c) => c !== cat)),
    }));
  }, [activeCategories]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BlanketHeader />

      <div className="mt-8">
        <CategoryTabs />
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
      <FAQSection />
      <ProductCategories response_categories={categories} isCategory={true} />
    </main>
  );
}
