'use client';

import { useWpPage } from '@/src/core/context/wp-page-context';

export function WpTitle({ className }: { className?: string }) {
  const page = useWpPage();
  if (!page) return null;

  return <h1 className={className}>{page.title}</h1>;
}
