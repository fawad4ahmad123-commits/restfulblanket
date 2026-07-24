'use client';

import Image from 'next/image';
import { useWpPage } from '@/src/core/context/wp-page-context';

export function WpHeroImage() {
  const page = useWpPage();

  if (!page?.heroImage?.src) return null;

  return (
    <div className="relative mb-10 overflow-hidden rounded-[28px]">
      <Image
        src={page.heroImage.src}
        alt={page.heroImage.alt || page.title}
        width={1200}
        height={675}
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 1104px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
