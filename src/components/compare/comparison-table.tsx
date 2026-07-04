import React from 'react';

import { cn } from '@/lib/utils';
import { Product, SPEC_ROWS } from './constants';

interface SpecComparisonTableProps {
  products: Product[];
}

export function SpecComparisonTable({ products }: SpecComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px] overflow-hidden rounded-2xl border border-stone-200/70 bg-[#f6efe4]">
        <div
          className="grid text-sm"
          style={{
            gridTemplateColumns: `1.2fr repeat(${products.length}, 1fr)`,
          }}
        >
          <div className="border-b border-stone-200/70 px-4 py-4 text-stone-500 md:px-6">
            Specifikationer
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="border-b border-stone-200/70 px-4 py-4 text-center font-medium text-stone-700 md:px-6"
            >
              {product.slug?.toLowerCase().includes('classic')
                ? 'Classic'
                : product.slug?.toLowerCase().includes('lite')
                  ? 'Lite'
                  : ''}
            </div>
          ))}

          {SPEC_ROWS.map((row, rowIndex) => (
            <React.Fragment key={row.label}>
              <div
                className={cn(
                  'px-4 py-4 text-stone-500 md:px-6',
                  rowIndex % 2 === 1 && 'bg-[#f0e7d8]/60',
                )}
              >
                {row.label}
              </div>

              {products.map((product) => (
                <div
                  key={`${product.id}-${row.label}`}
                  className={cn(
                    'px-4 py-4 text-center text-stone-700 md:px-6',
                    rowIndex % 2 === 1 && 'bg-[#f0e7d8]/60',
                  )}
                >
                  {row.getValue(product)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
