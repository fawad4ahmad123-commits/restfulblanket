'use client';

import {
  Package,
  Search,
  Sparkles,
  Percent,
  Palette,
  Weight,
  Ruler,
  Tag,
  ChevronDown,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FILTERS = [
  {
    title: 'All Product',
    icon: Package,
    count: 32,
    items: ['All Products'],
  },
  {
    title: 'New Arrival',
    icon: Search,
    items: ['Last 7 Days', 'Last 30 Days'],
  },
  {
    title: 'Best Seller',
    icon: Sparkles,
    items: ['Top Rated', 'Most Sold'],
  },
  {
    title: 'On Discount',
    icon: Percent,
    items: ['10% Off', '20% Off', '50% Off'],
  },
  {
    title: 'Colors',
    icon: Palette,
    items: ['White', 'Blue', 'Grey', 'Beige'],
  },
  {
    title: 'Weights',
    icon: Weight,
    items: ['2kg', '4kg', '6kg', '8kg'],
  },
  {
    title: 'Size',
    icon: Ruler,
    items: ['Small', 'Medium', 'Large'],
  },
  {
    title: 'Prices',
    icon: Tag,
    items: ['0-50', '50-100', '100-200'],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-full max-w-[320px]">
      <h2 className="mb-8 text-5xl font-serif text-[#3F322B]">Category</h2>

      <Accordion type="multiple" className="w-full">
        {FILTERS.map((filter) => {
          const Icon = filter.icon;

          return (
            <AccordionItem
              key={filter.title}
              value={filter.title}
              className="border-b border-[#E6DED6]"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="flex w-full items-center gap-3">
                  <Icon className="h-5 w-5 text-[#4A3F39]" />

                  <span className="text-xl text-[#4A3F39]">{filter.title}</span>

                  {filter.count && (
                    <span className="ml-auto mr-4 flex h-7 min-w-[28px] items-center justify-center rounded-md bg-[#FF6B6B] px-2 text-sm font-medium text-white">
                      {filter.count}
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-3 pb-4 pl-8">
                  {filter.items.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2 text-sm text-stone-600"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-stone-300"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </aside>
  );
};
export default Sidebar;
