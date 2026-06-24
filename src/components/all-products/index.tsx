'use client';

import { useMemo, useState } from 'react';

import { products as allProducts } from './data/products';
import Sidebar from './Sidebar';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';

const PAGE_SIZE = 9;

const Shop = () => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes('All Product') ||
        selectedCategories.some((c) =>
          product.category.toLowerCase().includes(c.toLowerCase()),
        );

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const pagedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="flex gap-10">
          <Sidebar />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-stone-500">
                Showing {pagedProducts.length} of {filteredProducts.length}{' '}
                items
              </p>
            </div>

            <ProductGrid products={pagedProducts} />

            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Shop;
