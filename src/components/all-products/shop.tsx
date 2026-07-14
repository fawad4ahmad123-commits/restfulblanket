'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();

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

  return (
    <section className="bg-[#F7F3EE] py-6">
      <div className="mx-auto max-w-7xl px-4">
        <p className="cursor-pointer mb-8 text-sm text-[#8A7A6F]">
          Hjem
          {categorySlug?.length > 0 &&
            ' > ' +
              categorySlug.map((item) => formatBreadcrumb(item)).join(' > ')}
        </p>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <ProductSidebar
            filters={filters}
            setFilters={updateFilters}
            filterOptions={filterOptions}
          />

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
