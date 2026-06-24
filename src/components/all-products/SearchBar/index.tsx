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
      className="flex w-full max-w-3xl items-center gap-3 rounded-xl border bg-white p-2 shadow-lg"
    >
      <span className="hidden sm:block whitespace-nowrap px-3 text-sm font-medium text-stone-600">
        Give All You Need
      </span>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search your item..."
          className="border-0 pl-9 shadow-none focus-visible:ring-0"
        />
      </div>
      <Button type="submit" className="rounded-lg">
        Search
      </Button>
    </form>
  );
}
