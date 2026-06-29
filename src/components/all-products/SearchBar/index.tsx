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
      aria-label="Site-wide search"
    >
      <div
        className="shrink-0 text-[18px] font-semibold text-[#392A22]"
        aria-hidden="true"
      >
        Give All You Need
      </div>

      <div className="flex h-[63px] w-[663px] items-center gap-3 rounded-full border-[1.5px] border-[#E8E1DA] px-2">
        <Search
          className="h-5 w-5 text-[#8D837B]"
          aria-hidden="true"
          focusable="false"
        />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search your item..."
          className="border-0 p-0 shadow-none focus-visible:ring-0"
          aria-label="Search input"
          id="search-input"
          type="search"
          autoComplete="off"
        />

        <Button
          type="submit"
          className="h-[47px] rounded-full px-10 bg-[#392A22]"
          aria-label="Submit search"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
