'use client';

import { useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'latest';

  const activeFilters = useActiveFilters({
    filters,
    setFilters,
  });

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSortChange = (value: string) => {
    updateQuery({
      sort: value,
      page: '1',
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get('page') !== '1') {
      params.set('page', '1');

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [filters]);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sort) {
      case 'price-low-high':
        return items.sort((a, b) => Number(a.price) - Number(b.price));

      case 'price-high-low':
        return items.sort((a, b) => Number(b.price) - Number(a.price));

      case 'popularity':
        return items.sort(
          (a, b) => Number(b.reviewCount || 0) - Number(a.reviewCount || 0),
        );

      case 'latest':
        return items.sort((a, b) => Number(b.id) - Number(a.id));

      default:
        return items;
    }
  }, [products, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = useMemo(
    () => paginateProducts(sortedProducts, currentPage, PRODUCTS_PER_PAGE),
    [sortedProducts, currentPage],
  );

  const handlePageChange = (page: number) => {
    updateQuery({
      page: page.toString(),
    });
  };

  return (
    <div className="flex-1">
      <p className="mb-6 text-sm text-[#6F6259]">
        Varer ({sortedProducts.length})
      </p>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <ActiveFilters filters={activeFilters} />
        </div>

        <div className="shrink-0 lg:w-[220px]">
          <ProductSort sort={sort} setSort={handleSortChange} />
        </div>
      </div>

      <ProductList products={paginatedProducts} />

      <CompareBar />

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
