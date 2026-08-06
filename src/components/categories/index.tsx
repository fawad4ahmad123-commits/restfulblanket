'use client';

import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { BlanketHeader } from '@/src/components/categories/blanket-header';
import { ProductGrid } from '@/src/components/categories/product-grid';
import ProductCategories from '@/src/components/Home/product-categories';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import { Pagination } from '../all-products/Pagination';
import ActiveFilters from '../all-products/ProductGrid/ActiveFilters';
import ProductSidebar from '../all-products/Sidebar';
import { FAQS } from './faqs';
import CategoryCcfSection from './category-ccf-section';
import BenefitSection from './benefit-section';
import CategoryFeatureCards from './category-feature-cards';
import CategoryLearnMoreCards from './category-learn-more-cards';
import { featureCards, guideCards } from './constants';
import { CategoryTabs } from './category-tabs';
import { BuildFilters, getInitialFilters } from '@/src/utilty/buildFilters';
import { filterProducts } from '@/src/utilty/filterProducts';
import { SelectedFilters } from '../all-products/types';

const ITEMS_PER_PAGE = 24;

function hasChildren(category: any, categories: any[]) {
  if (!category) return false;
  return categories.some((c: any) => c.parent === category.id);
}

function ccfHasData(ccf: any) {
  if (!ccf) return false;
  return Object.values(ccf).some((v: any) =>
    Array.isArray(v) ? v.length > 0 : !!v,
  );
}

function resolveCcf(category: any, categories: any[]) {
  if (!category) return null;
  if (ccfHasData(category.ccf)) return category.ccf;

  const parent = categories.find((c: any) => c.id === category.parent);
  if (parent && ccfHasData(parent.ccf)) return parent.ccf;

  return category.ccf || null;
}

export default function Categories({ products, categories, initialSlug }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const isCollectionsPage = pathname === '/collections';

  const urlSlugs = Array.isArray(initialSlug)
    ? initialSlug.map((s) => String(s).toLowerCase())
    : initialSlug
      ? [String(initialSlug).toLowerCase()]
      : [];

  const [activeCategories, setActiveCategories] = useState<string[]>(urlSlugs);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filterOptions = useMemo(() => BuildFilters(products), [products]);
  const [filters, setFilters] = useState<SelectedFilters>(() =>
    getInitialFilters(filterOptions.minPrice, filterOptions.maxPrice),
  );

  const updateFilters = (updater: React.SetStateAction<SelectedFilters>) => {
    setFilters((prev) =>
      typeof updater === 'function' ? updater(prev) : updater,
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (cats: string[]) => {
    const normalized = cats.map((c) => c.toLowerCase());
    setActiveCategories(normalized);
    setCurrentPage(1);

    if (normalized.length) {
      router.push(`/collections/${normalized.join('/')}`);
    } else {
      router.push('/collections');
    }
  };

  const filteredProducts = useMemo(() => {
    const catFiltered =
      activeCategories.length === 0
        ? products
        : products.filter((product: any) =>
            product.categories?.some((catName: string) => {
              const match = categories.find(
                (c: any) => c.name.toLowerCase() === catName.toLowerCase(),
              );
              return (
                match && activeCategories.includes(match.slug.toLowerCase())
              );
            }),
          );

    return filterProducts(catFiltered, filters, '');
  }, [activeCategories, products, filters, categories]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const activeFilterTags = useMemo(() => {
    return activeCategories.map((slug) => {
      const cat = categories.find(
        (c: any) => c.slug.toLowerCase() === slug.toLowerCase(),
      );

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

    if (!totalReviews) return { rating: 0, reviewCount: 0 };

    const weightedSum = products.reduce(
      (sum: number, p: any) => sum + (p.rating || 0) * (p.reviewCount || 0),
      0,
    );

    return {
      rating: Number((weightedSum / totalReviews).toFixed(1)),
      reviewCount: totalReviews,
    };
  }, [products]);

  const currentSlug = Array.isArray(initialSlug)
    ? initialSlug[initialSlug.length - 1]
    : initialSlug?.slug || initialSlug;

  const getActiveCat = categories.find(
    (cat: any) => cat.slug.toLowerCase() === String(currentSlug).toLowerCase(),
  );

  const activeCcf = useMemo(
    () => resolveCcf(getActiveCat, categories),
    [getActiveCat, categories],
  );

  const hasBenefitsData =
    activeCcf?.intro_text ||
    (Array.isArray(activeCcf?.benefits) && activeCcf.benefits.length > 0) ||
    (Array.isArray(activeCcf?.table) && activeCcf.table.length > 0) ||
    (Array.isArray(activeCcf?.table_headers) &&
      activeCcf.table_headers.length > 0) ||
    activeCcf?.table_description;

  const hasFaqsData =
    Array.isArray(activeCcf?.faqs) && activeCcf.faqs.length > 0;

  const hasCardsData =
    Array.isArray(activeCcf?.cards) && activeCcf.cards.length > 0;

  const hasExpertData = activeCcf?.expert_image_url || activeCcf?.expert_text;

  const hasAnyCcfData =
    hasBenefitsData || hasFaqsData || hasCardsData || hasExpertData;

  const activeFiltersCount =
    filters.colors.length +
    filters.weights.length +
    filters.sizes.length +
    activeCategories.length;

  if (isCollectionsPage) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <ProductCategories response_categories={categories} isCategory={true} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BlanketHeader
        name={getActiveCat?.name}
        description={getActiveCat?.description}
        rating={overallRating.rating}
        reviewCount={overallRating.reviewCount}
      />
      <div className="mt-8">
        <CategoryTabs
          categories={categories}
          activeCategories={activeCategories}
          onSelect={handleCategoryChange}
        />
      </div>
      <div className="mt-6 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#35281E] px-4 py-2 text-sm font-medium text-[#fdf9f6] bg-[#392A22]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtre
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#35281E] text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-[90%] max-w-sm overflow-y-auto bg-[#fdf9f6] p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#35281E]">Filtre</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductSidebar
              filters={filters}
              setFilters={updateFilters}
              filterOptions={filterOptions}
            />
          </div>
        </>
      )}
      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="hidden lg:block">
          <ProductSidebar
            filters={filters}
            setFilters={updateFilters}
            filterOptions={filterOptions}
          />
        </div>
        <div className="min-w-0 flex-1">
          <ActiveFilters filters={activeFilterTags} />

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

      {hasAnyCcfData && (
        <>
          <BenefitSection
            intro={activeCcf?.intro_text}
            benefits={activeCcf?.benefits || []}
            headers={activeCcf?.table_headers}
            rows={activeCcf?.table}
            description={activeCcf?.table_description}
            isParentCategory={hasChildren(getActiveCat, categories)}
          />

          <CategoryFeatureCards
            heading=""
            description=""
            cards={featureCards}
          />

          <CategoryLearnMoreCards
            description="Læs vores guides og få svar på dine spørgsmål om dynen."
            cards={guideCards}
          />

          <FAQS faqs={activeCcf?.faqs} />

          <CategoryCcfSection
            cards={activeCcf?.cards}
            expert={{
              imageUrl: activeCcf?.expert_image_url,
              text: activeCcf?.expert_text,
            }}
          />
        </>
      )}
      <ProductCategories response_categories={categories} isCategory={true} />
    </main>
  );
}
