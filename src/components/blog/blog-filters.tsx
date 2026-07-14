'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BLOG_CATEGORIES } from './constants';

export function BlogFilters() {
  const [active, setActive] = useState(BLOG_CATEGORIES[0].name);
  const router = useRouter();

  const handleClick = (item: { name: string; url: string }) => {
    setActive(item.name);
    router.push(item.url);
  };

  return (
    <>
      <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {BLOG_CATEGORIES.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`cursor-pointer flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-all ${
                active === item.name
                  ? 'border-[#3A2A22] bg-[#3A2A22] text-white'
                  : 'border-[#E4DAD1] bg-transparent text-[#7A716B]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 border-b border-[#E4DAD1]" />
    </>
  );
}
