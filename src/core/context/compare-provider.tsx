'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CompareItem {
  id: string;
  title: string;
  image: string;
  price: number;
  slug: string;
}

interface CompareContextType {
  compareItems: CompareItem[];
  toggleCompare: (item: CompareItem) => void;
}

const CompareContext = createContext<CompareContextType>(
  {} as CompareContextType,
);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const toggleCompare = (item: CompareItem) => {
    setCompareItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      }

      if (prev.length >= 4) {
        return prev;
      }

      return [...prev, item];
    });
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        toggleCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
