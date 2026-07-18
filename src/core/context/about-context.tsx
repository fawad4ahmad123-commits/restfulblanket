'use client';

import { AboutContextData } from '@/src/utilty/format-about-data';
import { createContext, useContext, type ReactNode } from 'react';

const AboutContext = createContext<AboutContextData | null>(null);

export function AboutProvider({
  data,
  children,
}: {
  data: AboutContextData;
  children: ReactNode;
}) {
  return <AboutContext.Provider value={data}>{children}</AboutContext.Provider>;
}

export function useAboutContext() {
  const ctx = useContext(AboutContext);
  if (!ctx) {
    throw new Error('useAboutContext must be used within <AboutProvider>');
  }
  return ctx;
}
