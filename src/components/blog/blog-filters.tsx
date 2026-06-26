'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const categories = [
  'All Articles',
  'Sleep Science',
  'Wellness Rituals',
  'Product Care',
  'Craft & Design',
  'Customer Stories',
];

export function BlogFilters() {
  const [active, setActive] = useState('All Articles');

  return (
    <>
      <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                active === item
                  ? 'border-[#3A2A22] bg-[#3A2A22] text-white'
                  : 'border-[#E4DAD1] bg-transparent text-[#7A716B]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-[300px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A79D96]" />

          <Input
            placeholder="Search articles..."
            className="h-11 rounded-full border-[#E4DAD1] bg-transparent pl-11"
          />
        </div>
      </div>

      <div className="mt-10 border-b border-[#E4DAD1]" />
    </>
  );
}
