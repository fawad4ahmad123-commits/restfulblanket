'use client';

import { useMemo } from 'react';
import { navigation } from '../components/constant';
import { navigationCategoryMap } from '../components/header/navigation-category-map';

const MAX_LINKS_PER_GROUP_SET = 4;

export function useMergedNavigation(categories: any[]) {
  return useMemo(() => {
    return navigation.map((item: any) => {
      const mappedSlugs = navigationCategoryMap[item.href];

      if (!mappedSlugs || !item.groups) return item;

      const existingSlugs = new Set(
        item.groups.flatMap((g: any) =>
          g.links.map((l: any) => l.href?.split('/').pop()),
        ),
      );

      const existingCount = item.groups.reduce(
        (sum: number, g: any) => sum + g.links.length,
        0,
      );

      const remainingSlots = Math.max(
        0,
        MAX_LINKS_PER_GROUP_SET - existingCount,
      );

      const newLinks = mappedSlugs
        .filter((slug: string) => !existingSlugs.has(slug))
        .slice(0, remainingSlots)
        .map((slug: string) => {
          const cat = categories.find((c: any) => c.slug === slug);

          if (!cat) return null;

          return {
            title: cat.name,
            href: `${item.href}/${cat.slug}`,
            image: cat.image?.src ?? null,
          };
        })
        .filter(Boolean);

      if (!newLinks.length) return item;

      return {
        ...item,
        groups: [...item.groups, { heading: 'MORE', links: newLinks }],
      };
    });
  }, [categories]);
}
