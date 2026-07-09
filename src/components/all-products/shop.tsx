'use client';
import { useEffect, useMemo, useState } from 'react';
import { buildFilters, getInitialFilters } from '@/src/utilty/buildFilters';
import { filterProducts } from '@/src/utilty/filterProducts';
import ProductGrid from './ProductGrid';
import ProductSidebar from './Sidebar';
import { SelectedFilters } from './types';

export default function Shop({
  data,
  searchQuery = '',
  categorySlug = '',
}: {
  data: any[];
  searchQuery?: string;
  categorySlug?: string;
}) {
  const filterOptions = useMemo(() => buildFilters(data), [data]);

  const [filters, setFilters] = useState<SelectedFilters>(() =>
    getInitialFilters(filterOptions.minPrice, filterOptions.maxPrice),
  );

  useEffect(() => {
    if (!categorySlug) return;
    setFilters((f) =>
      f.categories.includes(categorySlug)
        ? f
        : { ...f, categories: [...f.categories, categorySlug] },
    );
  }, [categorySlug]);

  const filteredProducts = useMemo(
    () => filterProducts(data, filters, searchQuery),
    [data, filters, searchQuery],
  );

  return (
    <section className="bg-[#F7F3EE] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-sm text-[#8A7A6F]">Home / All Product</div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <ProductSidebar
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
          />

          <ProductGrid
            products={filteredProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </section>
  );
}
