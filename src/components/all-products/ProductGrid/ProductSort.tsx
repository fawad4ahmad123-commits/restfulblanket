import { sortOptions } from '../constants';

export default function ProductSort() {
  return (
    <div className="relative">
      <label htmlFor="product-sort" className="sr-only">
        Sort products
      </label>

      <select
        id="product-sort"
        name="product-sort"
        aria-label="Sort products"
        className="h-11 w-full appearance-none rounded-full border border-[#E9DDD4] bg-[#FDF9F6] px-6 pr-12 text-sm text-[#35281E] outline-none"
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
