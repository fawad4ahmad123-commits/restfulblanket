'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppTooltip from '../tooltip';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-full border border-[#E3DCCD]">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="h-10 w-10 rounded-full hover:bg-[#F4EFE6]"
      >
        <Minus className="h-3.5 w-3.5 text-[#3F3A36]" />
      </Button>
      <span className="w-6 text-center text-sm font-medium text-[#3F3A36]">
        {quantity}
      </span>
      <AppTooltip
        content={`Only ${max} item${max > 1 ? 's' : ''} available in stock`}
        disabled={quantity < max}
      >
        <span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Increase quantity"
            disabled={quantity >= max}
            onClick={() => onChange(Math.min(max, quantity + 1))}
            className="h-10 w-10 rounded-full hover:bg-[#F4EFE6]"
          >
            <Plus className="h-3.5 w-3.5 text-[#3F3A36]" />
          </Button>
        </span>
      </AppTooltip>
    </div>
  );
}
