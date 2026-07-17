'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export interface ProductMetaFields {
  certificateImage?: string;
  certificateImages?: string[];
  offerBadge?: string;
  offerText?: string;
  promoColor?: string;
  promoText?: string;
  properties?: string;
  temperature?: string;
  themeColor?: string;
}

interface ProductMetaContextType {
  metaFields: ProductMetaFields | null;
  setMetaFields: (data: ProductMetaFields | null) => void;
}

const ProductMetaContext = createContext<ProductMetaContextType | undefined>(
  undefined,
);

export function ProductMetaProvider({ children }: { children: ReactNode }) {
  const [metaFields, setMetaFields] = useState<ProductMetaFields | null>(null);

  const value = useMemo(
    () => ({
      metaFields,
      setMetaFields,
    }),
    [metaFields],
  );

  return (
    <ProductMetaContext.Provider value={value}>
      {children}
    </ProductMetaContext.Provider>
  );
}

export function useProductMeta() {
  const context = useContext(ProductMetaContext);

  if (!context) {
    throw new Error('useProductMeta must be used within ProductMetaProvider');
  }

  return context;
}
