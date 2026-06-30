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
    <div className="border-t border-stone-200 px-6 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between"
      >
        Apply discount code
        <ChevronDown className={open ? 'rotate-180' : ''} />
      </button>

      {open && (
        <div className="mt-3 flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter discount code here"
            className="rounded-full h-[48px] "
          />

          <Button
            onClick={() => onApplyDiscount(code)}
            className="cursor-pointer rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 p-6"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
