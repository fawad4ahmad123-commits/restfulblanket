'use client';

import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { buildFilters, getInitialFilters } from '@/src/utilty/buildFilters';
import { filterProducts } from '@/src/utilty/filterProducts';

import ProductGrid from './ProductGrid';
import ProductSidebar from './Sidebar';
import { SelectedFilters } from './types';

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ae/g, 'æ')
    .replace(/oe/g, 'ø')
    .replace(/aa/g, 'å');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .replace(/\s+/g, '-');
}

function formatBreadcrumb(value: string) {
  return decodeURIComponent(value)
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Shop({
  data,
  searchQuery = '',
  categorySlug = [],
}: {
  data: any[];
  searchQuery?: string;
  categorySlug?: string[];
}) {
  const router = useRouter();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filterOptions = useMemo(() => buildFilters(data), [data]);

  const [filters, setFilters] = useState<SelectedFilters>(() =>
    getInitialFilters(filterOptions.minPrice, filterOptions.maxPrice),
  );

  useEffect(() => {
    if (!categorySlug?.length) return;

    const urlCategories = categorySlug.map((item) =>
      normalizeCategory(item.replaceAll('-', ' ')),
    );

    setFilters((prev) => ({
      ...prev,
      categories: urlCategories,
    }));
  }, [categorySlug]);

  const updateFilters = (updater: React.SetStateAction<SelectedFilters>) => {
    setFilters((prev) => {
      const newFilters =
        typeof updater === 'function' ? updater(prev) : updater;

      if (
        JSON.stringify(prev.categories) !==
        JSON.stringify(newFilters.categories)
      ) {
        const categoryPath = newFilters.categories.length
          ? '/' + newFilters.categories.map(slugify).join('/')
          : '';

        setTimeout(() => {
          router.push(`/shop${categoryPath}`);
        }, 0);
      }

      return newFilters;
    });
  };

  const filteredProducts = useMemo(
    () => filterProducts(data, filters, searchQuery),
    [data, filters, searchQuery],
  );

  const activeFiltersCount =
    filters.categories.length +
    filters.colors.length +
    filters.weights.length +
    filters.sizes.length;

  return (
    <section className="bg-[#F7F3EE]">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-8 text-sm text-[#8A7A6F]">
          Hjem
          {categorySlug?.length > 0 &&
            ' > ' +
              categorySlug.map((item) => formatBreadcrumb(item)).join(' > ')}
        </p>

        <div className="mb-6 lg:hidden">
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

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="hidden lg:block">
            <ProductSidebar
              filters={filters}
              setFilters={updateFilters}
              filterOptions={filterOptions}
            />
          </div>

          <ProductGrid
            products={filteredProducts}
            filters={filters}
            setFilters={updateFilters}
          />
        </div>
      </div>
    </section>
  );
}
