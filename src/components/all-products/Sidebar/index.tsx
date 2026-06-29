'use client';
import { Check } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buildSidebarFilters } from '@/src/utilty/sidebarFilters';
import { toggleFilter } from '@/src/utilty/toggleFilter';
import { isLight } from '@/src/utilty/isLight';
import DualRangeSlider from '../DualRangeSlider';
import { ProductSideCategory } from './types';

export default function ProductSidebar({
  filters,
  setFilters,
  filterOptions,
}: ProductSideCategory) {
  const filterCategories = useMemo(
    () => buildSidebarFilters(filterOptions),
    [filterOptions],
  );

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
              <div className="flex items-center gap-3">
                {item.label}

                {item.id === 'all' && (
                  <span className="rounded bg-[#35281E] px-1.5 py-0.5 text-[10px] text-white">
                    {item.count}
                  </span>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className="cursor-pointer">
              {item.children?.length ? (
                <div className="space-y-3 pb-4 pl-4">
                  {item.children.map((child: any) => (
                    <label
                      key={child.id}
                      className="flex cursor-pointer items-center gap-2 text-sm text-[#6F6259]"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(child.id)}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            categories: toggleFilter(f.categories, child.id),
                          }))
                        }
                        className="h-4 w-4 rounded border-[#D9CCC3] text-[#35281E] accent-[#35281E]"
                      />
                      {child.label}
                    </label>
                  ))}
                </div>
              ) : null}

              {item.colors?.length ? (
                <div className="flex flex-wrap gap-3 pb-4">
                  {item.colors.map((color: any) => {
                    const isSelected = filters.colors.includes(color.id);

                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            colors: toggleFilter(f.colors, color.id),
                          }))
                        }
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                          isSelected
                            ? 'ring-2 ring-[#35281E] ring-inset'
                            : 'border border-[#E9DDD4]'
                        }`}
                        style={{
                          backgroundColor: color.hex,
                        }}
                      >
                        {isSelected && (
                          <Check
                            className="absolute inset-0 m-auto h-3.5 w-3.5"
                            color={isLight(color.hex) ? '#35281E' : '#FFFFFF'}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {item.type === 'weight' && item.options?.length && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {item.options.map((option: string) => {
                    const isSelected = filters.weights.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            weights: toggleFilter(f.weights, option),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${
                          isSelected
                            ? 'border-[#35281E] bg-[#35281E] text-white'
                            : 'border-[#D9CCC3] text-[#6F6259]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {item.type === 'size' && item.options?.length && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {item.options.map((option: string) => {
                    const isSelected = filters.sizes.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            sizes: toggleFilter(f.sizes, option),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${
                          isSelected
                            ? 'border-[#35281E] bg-[#35281E] text-white'
                            : 'border-[#D9CCC3] text-[#6F6259]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {item.type === 'price' && (
                <div className="pb-4">
                  <div className="mb-3 grid grid-cols-2 text-xs text-[#6F6259]">
                    <span>{filters.minPrice}kr</span>
                    <span className="text-right">{filters.maxPrice}kr</span>
                  </div>

                  <DualRangeSlider
                    min={item.minPrice}
                    max={item.maxPrice}
                    valueMin={filters.minPrice}
                    valueMax={filters.maxPrice}
                    onChange={(minPrice, maxPrice) =>
                      setFilters((f) => ({
                        ...f,
                        minPrice,
                        maxPrice,
                      }))
                    }
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
