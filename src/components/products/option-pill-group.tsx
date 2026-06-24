'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import SizeGuideButton from './modal';

interface PillOption {
  id: string;
  label: string;
  inStock: boolean;
}

interface OptionPillGroupProps {
  label: string;
  options: PillOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  trailingSlot?: React.ReactNode;
}

const OptionPillGroup = ({
  label,
  options,
  selectedId,
  onSelect,
  trailingSlot,
}: OptionPillGroupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-[#3F3A36]">
          {label}
        </p>

        {label === 'Weight' ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm font-medium text-[#3A2A21] underline underline-offset-2 hover:opacity-70 cursor-pointer"
          >
            Weight guide
          </button>
        ) : (
          trailingSlot
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <button
              key={option.id}
              type="button"
              disabled={!option.inStock}
              aria-pressed={isSelected}
              onClick={() => onSelect(option.id)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                isSelected
                  ? 'border-[#E6CBB8] bg-[#E6CBB8] text-[#3F3A36]'
                  : 'border-[#E3DCCD] bg-transparent text-[#3F3A36] hover:border-[#3F3A36]',
                !option.inStock &&
                  'cursor-not-allowed border-[#E3DCCD] text-[#C7C0B2] line-through',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <SizeGuideButton open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default OptionPillGroup;
