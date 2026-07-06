import React from 'react';

import { Product, SPEC_ROWS } from './constants';

interface SpecComparisonTableProps {
  products: Product[];
}

export function SpecComparisonTable({ products }: SpecComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px] overflow-hidden rounded-2xl border border-[#d8c6b8] bg-[#faf4ee]">
        {/* HEADER */}
        <div
          className="grid divide-x divide-[#d8c6b8] border-b border-[#d8c6b8] text-sm"
          style={{
            gridTemplateColumns: `1.2fr repeat(${products.length}, 1fr)`,
          }}
        >
          <div className="px-4 py-4 text-stone-600 md:px-6">
            Specifikationer
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="whitespace-nowrap overflow-hidden text-ellipsis px-4 py-4 text-center font-medium text-stone-700 md:px-6"
            >
              {product.slug?.toLowerCase().includes('classic')
                ? 'Classic'
                : product.slug?.toLowerCase().includes('lite')
                  ? 'Lite'
                  : product.title}
            </div>
          ))}
        </div>

        {/* ROWS */}
        <div className="divide-y divide-[#d8c6b8]">
          {SPEC_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid divide-x divide-[#d8c6b8] text-sm"
              style={{
                gridTemplateColumns: `1.2fr repeat(${products.length}, 1fr)`,
              }}
            >
              <div className="px-4 py-4 text-stone-600 md:px-6">
                {row.label}
              </div>

              {products.map((product) => (
                <div
                  key={`${product.id}-${row.label}`}
                  className="px-4 py-4 text-center text-stone-700 md:px-6"
                >
                  {row.getValue(product)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
