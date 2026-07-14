'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-8"
      role="search"
      aria-label="Søg på hele siden"
    >
      <div
        className="hidden shrink-0 text-[18px] font-semibold text-[#392A22] lg:block"
        aria-hidden="true"
      >
        Giv alt hvad du behøver
      </div>

      <div className="flex h-[63px] w-full items-center gap-3 rounded-full border-[1.5px] border-[#E8E1DA] px-2 lg:w-[663px]">
        <Search
          className="h-5 w-5 text-[#8D837B]"
          aria-hidden="true"
          focusable="false"
        />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Søg efter dit produkt..."
          className="border-0 p-0 shadow-none focus-visible:ring-0"
          aria-label="Søgefelt"
          id="search-input"
          type="search"
          autoComplete="off"
        />

        <Button
          type="submit"
          className="h-[47px] rounded-full bg-[#392A22] px-6 sm:px-10"
          aria-label="Udfør søgning"
        >
          Søg
        </Button>
      </div>
    </form>
  );
}
