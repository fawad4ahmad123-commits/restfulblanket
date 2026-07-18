'use client';

import { ParsedWpPage } from '@/src/lib/parse-wp-about';
import { createContext, useContext, type ReactNode } from 'react';

const WpPageContext = createContext<ParsedWpPage | null>(null);

export function WpPageProvider({
  page,
  children,
}: {
  page: ParsedWpPage | null;
  children: ReactNode;
}) {
  return (
    <WpPageContext.Provider value={page}>{children}</WpPageContext.Provider>
  );
}

export function useWpPage() {
  const ctx = useContext(WpPageContext);
  if (ctx === undefined) {
    throw new Error('useWpPage must be used within <WpPageProvider>');
  }
  return ctx;
}
