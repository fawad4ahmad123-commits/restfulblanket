'use client';

import { useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductSidebar from './Sidebar';
import { defaultFilters, SelectedFilters } from './types';

export default function Shop() {
  const [filters, setFilters] = useState<SelectedFilters>(defaultFilters);

  return (
    <section className="bg-[#F7F3EE] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-sm text-[#8A7A6F]">Home / All Product</div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <ProductSidebar filters={filters} setFilters={setFilters} />
          <ProductGrid filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </section>
  );
}
