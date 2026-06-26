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
      className="relative z-10 mx-auto flex w-full max-w-4xl items-center gap-6  bg-white px-8 py-5 shadow-lg"
      style={{ borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }}
    >
      <div className="hidden shrink-0 text-left sm:block">
        <span className="text-sm font-semibold text-stone-700">
          Give All You Need
        </span>
      </div>

      {/* Divider */}
      <div className="hidden h-8 w-px bg-stone-200 sm:block" />

      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search your item..."
          className="h-12 border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="rounded-full px-8 py-6 text-sm font-medium"
      >
        Search
      </Button>
    </form>
  );
}
