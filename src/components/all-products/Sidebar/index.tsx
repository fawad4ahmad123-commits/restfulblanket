'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check } from 'lucide-react';
import { filterCategories } from '../constants';
import { SelectedFilters } from '../types';

interface Props {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function ProductSidebar({ filters, setFilters }: Props) {
  return (
    <aside className="w-full lg:w-[260px]">
      <h2 className="mb-6 text-[34px] font-serif text-[#35281E]">Category</h2>
      <Accordion type="multiple" defaultValue={['all']} className="space-y-2">
        {filterCategories.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-b border-[#E9DDD4]"
          >
            <AccordionTrigger className="py-4 text-sm font-medium text-[#35281E] hover:no-underline">
              <div className="flex items-center gap-3">
                {item.label}
                {item.id === 'all' && (
                  <span className="rounded bg-[#E54D42] px-1.5 py-0.5 text-[10px] text-white">
                    {item.count}
                  </span>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent>
              {item.children?.length ? (
                <div className="space-y-3 pb-4 pl-4">
                  {item.children.map((child) => (
                    <label
                      key={child.id}
                      className="flex items-center gap-2 text-sm text-[#6F6259] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(child.id)}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            categories: toggle(f.categories, child.id),
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
                  {item.colors.map((color) => {
                    const isSelected = filters.colors.includes(color.id);
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            colors: toggle(f.colors, color.id),
                          }))
                        }
                        className={`relative h-7 w-7 rounded-full border transition-all ${
                          isSelected
                            ? 'ring-2 ring-offset-2 ring-[#35281E]'
                            : 'border-[#E9DDD4]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
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
                  {item.options.map((option) => {
                    const isSelected = filters.weights.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            weights: toggle(f.weights, option),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          isSelected
                            ? 'border-[#35281E] bg-[#35281E] text-white'
                            : 'border-[#D9CCC3] text-[#6F6259] hover:border-[#35281E]'
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
                  {item.options.map((option) => {
                    const isSelected = filters.sizes.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            sizes: toggle(f.sizes, option),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          isSelected
                            ? 'border-[#35281E] bg-[#35281E] text-white'
                            : 'border-[#D9CCC3] text-[#6F6259] hover:border-[#35281E]'
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
                  <div className="mb-3 flex justify-between text-xs text-[#6F6259]">
                    <span>${filters.minPrice}</span>
                    <span>${filters.maxPrice}</span>
                  </div>
                  <DualRangeSlider
                    min={item.minPrice ?? 0}
                    max={item.maxPrice ?? 1000}
                    valueMin={filters.minPrice}
                    valueMax={filters.maxPrice}
                    onChange={(minPrice, maxPrice) =>
                      setFilters((f) => ({ ...f, minPrice, maxPrice }))
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

function isLight(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function DualRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
}) {
  const minPct = ((valueMin - min) / (max - min)) * 100;
  const maxPct = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="relative h-6 w-full">
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#E9DDD4]" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#35281E]"
        style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={valueMin}
        onChange={(e) => {
          const v = Math.min(Number(e.target.value), valueMax - 1);
          onChange(v, valueMax);
        }}
        className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={valueMax}
        onChange={(e) => {
          const v = Math.max(Number(e.target.value), valueMin + 1);
          onChange(valueMin, v);
        }}
        className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
      />
    </div>
  );
}
