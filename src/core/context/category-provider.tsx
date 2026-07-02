'use client';
import { createContext, useContext, useMemo, ReactNode } from 'react';
import { Category, CategoryContextType } from './types';

// --- Product normalization -------------------------------------------
// ASSUMPTION: getBestSellers() returns WooCommerce-style objects.
// Adjust the field lookups below if your real API shape differs —
// this is the only function that needs to change.
function normalizeProduct(p: any) {
  const image =
    p.images?.[0]?.src ??
    p.image?.src ??
    (typeof p.image === 'string' ? p.image : null) ??
    '/products/placeholder.jpg';

  const rawPrice = p.price ?? p.regular_price ?? p.sale_price ?? '';
  const price =
    typeof rawPrice === 'number'
      ? `€${rawPrice}`
      : String(rawPrice).trim().startsWith('€')
        ? rawPrice
        : rawPrice
          ? `€${rawPrice}`
          : '';

  const href = p.permalink
    ? `/products/${p.slug ?? p.id}`
    : `/products/${p.slug ?? p.id}`;

  const categoryIds = (p.categories ?? []).map((c: any) =>
    typeof c === 'object' ? c.id : c,
  );

  return {
    id: p.id,
    title: p.name ?? p.title ?? '',
    price,
    image,
    href,
    categoryIds,
  };
}

export function CategoryProvider({
  children,
  categories,
  products = [],
}: {
  children: ReactNode;
  categories: Category[];
  products?: any[];
}) {
  const parentCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.parent === 0 && category.slug !== 'ukategoriseret',
      ),
    [categories],
  );

  const getChildren = (parentId: number) => {
    return categories.filter((category) => category.parent === parentId);
  };

  const normalizedProducts = useMemo(
    () => products.map(normalizeProduct),
    [products],
  );

  const getProductsByCategory = (categoryId: number | null, limit = 4) => {
    if (categoryId == null) return normalizedProducts.slice(0, limit);
    return normalizedProducts
      .filter((p) => p.categoryIds.includes(categoryId))
      .slice(0, limit);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        parentCategories,
        getChildren,
        getProductsByCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategories() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategories must be used within CategoryProvider');
  }

  return context;
}
