'use client';

import { useMemo, useState } from 'react';
import { SHOP_PRODUCTS, sortOptions } from '../constants';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { SelectedFilters } from '../types';

const PRODUCTS_PER_PAGE = 6;

interface Props {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export default function ProductGrid({ filters, setFilters }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((p) => {
      if (filters.weights.length && !filters.weights.includes(p.weight))
        return false;
      if (filters.sizes.length && !filters.sizes.includes(p.dimensions))
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice)
        return false;
      if (
        filters.categories.length &&
        !filters.categories.some((c) => p.category?.toLowerCase().includes(c))
      )
        return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const activeChips: { label: string; clear: () => void }[] = [
    ...filters.weights.map((w) => ({
      label: w,
      clear: () =>
        setFilters((f) => ({
          ...f,
          weights: f.weights.filter((x) => x !== w),
        })),
    })),
    ...filters.sizes.map((s) => ({
      label: s,
      clear: () =>
        setFilters((f) => ({ ...f, sizes: f.sizes.filter((x) => x !== s) })),
    })),
    ...filters.categories.map((c) => ({
      label: c,
      clear: () =>
        setFilters((f) => ({
          ...f,
          categories: f.categories.filter((x) => x !== c),
        })),
    })),
  ];

  return (
    <div className="flex-1">
      <p className="mb-6 text-sm text-[#6F6259]">
        Items ({filteredProducts.length})
      </p>

      <div className="mb-8 flex items-center justify-between">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {activeChips.length > 0 && (
            <span className="text-sm font-medium text-[#6F6259]">
              Active Filter
            </span>
          )}
          {activeChips.map((filter) => (
            <button
              key={filter.label}
              onClick={filter.clear}
              className="flex items-center gap-2 rounded-full bg-[#EFE3D7] px-4 py-2 text-sm text-[#35281E]"
            >
              {filter.label}
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>
          ))}
        </div>

        <div className="relative">
          <select className="h-11 w-full appearance-none rounded-full border border-[#E9DDD4] bg-white px-6 pr-12 text-sm text-[#35281E] outline-none">
            {sortOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <p className="py-16 text-center text-sm text-[#8A7A6F]">
          No products match your filters.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                image: product.image || '',
                title: product.name,
                price: `${product.currency}${product.price}`,
                originalPrice: `${product.currency}${product.originalPrice}`,
                weight: product.weight,
                dimensions: product.dimensions,
                rating: product.rating,
                reviewCount: product.reviewCount,
                isNew: product.isNewArrival,
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
