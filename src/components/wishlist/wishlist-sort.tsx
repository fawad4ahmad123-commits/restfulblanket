'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortOptions } from './constants';

interface WishlistSortProps {
  value: string;
  onChange: (value: string) => void;
}

export function WishlistSort({ value, onChange }: WishlistSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] rounded-full border-border bg-[#fff9f5] text-sm">
        <SelectValue placeholder="Sortér efter" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="bg-[#fff9f5]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
