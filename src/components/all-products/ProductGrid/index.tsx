'use client';
import { useEffect, useMemo, useState } from 'react';
import { useActiveFilters } from '@/src/hooks/useActiveFilters';
import { paginateProducts } from '@/src/utilty/paginateProducts';
import ActiveFilters from './ActiveFilters';
import ProductList from './ProductList';
import ProductSort from './ProductSort';
import { Pagination } from '../Pagination';
import { SelectedFilters } from '../types';
import CompareBar from '../../compare/compare-bar';

const PRODUCTS_PER_PAGE = 6;

interface Props {
  products: any[];
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export default function ProductGrid({ products, filters, setFilters }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE),
  );

  const activeFilters = useActiveFilters({
    filters,
    setFilters,
  });

  const paginatedProducts = useMemo(
    () => paginateProducts(products, currentPage, PRODUCTS_PER_PAGE),
    [products, currentPage],
  );

  return (
    <div className="flex-1">
      <p className="mb-6 text-sm text-[#6F6259]">Items ({products.length})</p>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <ActiveFilters filters={activeFilters} />
        </div>

        <div className="shrink-0 lg:w-[220px]">
          <ProductSort />
        </div>
      </div>

      <ProductList products={paginatedProducts} />
      <CompareBar />
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
