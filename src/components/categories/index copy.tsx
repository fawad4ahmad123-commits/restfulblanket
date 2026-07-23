'use client';

import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BlanketHeader } from '@/src/components/categories/blanket-header';
import ComparisonSection from '@/src/components/categories/comparison-section';
import { ProductGrid } from '@/src/components/categories/product-grid';
import ProductCategories from '@/src/components/Home/product-categories';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import { Pagination } from '../all-products/Pagination';
import ActiveFilters from '../all-products/ProductGrid/ActiveFilters';
import { FAQS } from './faqs';
import CategoryCcfSection from './category-ccf-section';
import BenefitSection from './benefit-section';
import CategoryFeatureCards from './category-feature-cards';
import CategoryLearnMoreCards from './category-learn-more-cards';
import { featureCards, guideCards } from './constants';

const ITEMS_PER_PAGE = 8;

// A category counts as a "parent" if some other category lists it as parent.
// e.g. Tyngdedyner is a parent because Børn/Voksne point to it.
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

// Leaf sub-categories (Børn, Voksne) often don't have their own CCF filled
// in yet, so fall back to the parent category's (Tyngdedyner) CCF data.
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

  if (isCollectionsPage) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <ProductCategories response_categories={categories} isCategory={true} />
      </main>
    );
  }

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
    if (activeCategories.length === 0) return products;

    return products.filter((product: any) =>
      product.categories?.some((catName: string) => {
        const match = categories.find(
          (c: any) => c.name.toLowerCase() === catName.toLowerCase(),
        );

        return match && activeCategories.includes(match.slug.toLowerCase());
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
    if (!products?.length) {
      return {
        rating: 0,
        reviewCount: 0,
      };
    }

    const totalReviews = products.reduce(
      (sum: number, p: any) => sum + (p.reviewCount || 0),
      0,
    );

    if (!totalReviews) {
      return {
        rating: 0,
        reviewCount: 0,
      };
    }

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

  // Tyngdedyner (has children Børn/Voksne) -> only research/table/FAQ.
  // Børn / Voksne (leaf categories) -> also show cards + expert, at the end.
  const showCardsAndExpert =
    !!getActiveCat && !hasChildren(getActiveCat, categories);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BlanketHeader
        name={getActiveCat?.name}
        description={getActiveCat?.description}
        rating={overallRating.rating}
        reviewCount={overallRating.reviewCount}
      />
      {/* <div className="mt-8">
        <CategoryTabs
          categories={categories}
          activeCategories={activeCategories}
          onSelect={handleCategoryChange}
        />
      </div> */}
      <div className="mt-10">
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
      <TestimonialVideoSlider isCategory={true} />
      <BenefitSection
        intro={activeCcf?.intro_text}
        benefits={activeCcf?.benefits || []}
        headers={activeCcf?.table_headers}
        rows={activeCcf?.table}
        description={activeCcf?.table_description}
        isParentCategory={hasChildren(getActiveCat, categories)}
      />
      <CategoryFeatureCards heading="" description="" cards={featureCards} />

      <CategoryLearnMoreCards
        description="Læs vores guides og få svar på dine spørgsmål om dynen."
        cards={guideCards}
      />
      <FAQS faqs={activeCcf?.faqs} />
      <ProductCategories response_categories={categories} isCategory={true} />
      <CategoryCcfSection
        cards={activeCcf?.cards}
        expert={{
          imageUrl: activeCcf?.expert_image_url,
          text: activeCcf?.expert_text,
        }}
      />
    </main>
  );
}
