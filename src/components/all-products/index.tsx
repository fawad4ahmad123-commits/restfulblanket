'use client';

import { useEffect, useState } from 'react';
import ShopHero from '@/src/components/all-products/shop-Hero';
import { getAllProducts } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';
import Shop from './shop';
import { Loader } from '../loader';

export default function ShopPageClient({
  initialData,
  categorySlug,
}: {
  initialData: any[];
  categorySlug?: any;
}) {
  const [data, setData] = useState<any[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      setLoading(true);

      try {
        const allProductData = await getAllProducts({
          search: searchQuery,
        });

        const response = formatProducts(allProductData);

        if (active) {
          setData(response);
        }
      } catch (err) {
        console.error('search fetch failed', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [searchQuery]);

  return (
    <>
      <ShopHero data={data} onSearch={setSearchQuery} />

      <div className="bg-[#FDF9F6]">
        {loading ? (
          <Loader />
        ) : (
          <Shop data={data} categorySlug={categorySlug} />
        )}
      </div>
    </>
  );
}
