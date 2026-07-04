'use client';

import { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  categories: any[];
  activeCategories: string[];
  setActiveCategories: (value: string[]) => void;
}

export default function CategorySidebar({
  categories,
  activeCategories,
  setActiveCategories,
}: Props) {
  const filterCategories = useMemo(() => {
    return [
      {
        id: 'all',
        label: 'All Categories',
        children: categories.map((c) => ({
          id: c.slug,
          label: c.name,
        })),
      },
    ];
  }, [categories]);

  const toggleCategory = (id: string) => {
    if (id === 'all') {
      setActiveCategories([]);
      return;
    }

    setActiveCategories(
      activeCategories.includes(id)
        ? activeCategories.filter((x) => x !== id)
        : [...activeCategories, id],
    );
  };

  return (
    <aside className="w-full lg:w-[260px]">
      <h2 className="mb-6 text-[34px] font-serif text-[#35281E]">Category</h2>

      <Accordion type="multiple" defaultValue={['all']} className="space-y-2">
        {filterCategories.map((item: any, itemIndex: number) => (
          <AccordionItem
            key={`${item.id}-${itemIndex}`}
            value={item.id}
            className="border-b border-[#E9DDD4]"
          >
            <AccordionTrigger className="py-4 text-sm font-medium text-[#35281E] hover:no-underline">
              {item.label}
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-3 pb-4 pl-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#6F6259]">
                  <input
                    type="checkbox"
                    checked={activeCategories.length === 0}
                    onChange={() => setActiveCategories([])}
                    className="h-4 w-4 accent-[#35281E]"
                  />
                  All Categories
                </label>

                {item.children?.map((child: any) => (
                  <label
                    key={child.id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#6F6259]"
                  >
                    <input
                      type="checkbox"
                      checked={activeCategories.includes(child.id)}
                      onChange={() => toggleCategory(child.id)}
                      className="h-4 w-4 accent-[#35281E]"
                    />
                    {child.label}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
