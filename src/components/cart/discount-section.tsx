'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onApplyDiscount: (code: string) => void;
}

export default function DiscountSection({ onApplyDiscount }: Props) {
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState('');

  return (
    <div className="border-t border-stone-200 px-4 py-3 md:px-6 md:py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center text-sm md:text-base font-medium text-stone-900"
      >
        Apply discount code
        <ChevronDown
          className={`h-4 w-4 md:h-5 md:w-5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-2.5 md:mt-3 flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter discount code"
            className="rounded-full h-[38px] md:h-[48px] text-xs md:text-sm bg-white"
          />

          <Button
            onClick={() => onApplyDiscount(code)}
            className="cursor-pointer rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 h-[38px] md:h-[48px] px-4 md:px-6 py-0 text-xs md:text-sm text-white"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
