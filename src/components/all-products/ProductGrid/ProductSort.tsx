'use client';

import { sortOptions } from '../constants';

interface Props {
  sort: string;
  setSort: (value: string) => void;
}

export default function ProductSort({ sort, setSort }: Props) {
  return (
    <div className="relative">
      <label htmlFor="product-sort" className="sr-only">
        Sorter produkter
      </label>

      <select
        id="product-sort"
        name="product-sort"
        aria-label="Sorter produkter"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="h-11 w-full  rounded-full border border-[#fdf9f6] bg-[#FDF9F6] px-6 pr-12 text-sm text-[#35281E] outline-none  appearance-none focus:border-[#35281E] focus:ring-1 focus:ring-[#35281E] sm:text-base"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
