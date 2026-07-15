'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/src/core/context/auth-context';
import { getUserOrders } from '@/src/lib/orders';
import { Order, OrderStatus } from '@/src/components/profile/types/profile';

function mapWooOrderToProfileOrder(wooOrder: any): Order {
  let status: OrderStatus = 'on-the-way';
  if (wooOrder.status === 'completed') status = 'delivered';
  else if (['cancelled', 'refunded', 'failed'].includes(wooOrder.status))
    status = 'regretted';

  const firstItem = wooOrder.line_items?.[0];
  const productName = firstItem?.name || 'Tyngdedyne';

  let productSubtitle = 'Standard';
  if (firstItem?.meta_data && Array.isArray(firstItem.meta_data)) {
    const sizeMeta = firstItem.meta_data.find((meta: any) =>
      [
        'size',
        'størrelse',
        'dimensioner',
        'dimensions',
        'color',
        'farve',
      ].includes(meta.key?.toLowerCase()),
    );
    if (sizeMeta) productSubtitle = sizeMeta.value;
  }

  const image =
    firstItem?.image?.src ||
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80';

  const currencySymbols: Record<string, string> = { DKK: 'kr. ' };
  const currency =
    currencySymbols[wooOrder.currency?.toUpperCase()] ||
    wooOrder.currency ||
    'kr. ';

  return {
    id: String(wooOrder.id),
    orderNumber: `#RFB-${wooOrder.number || wooOrder.id}`,
    date: new Date(wooOrder.date_created).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    productName,
    productSubtitle,
    image,
    price: parseFloat(wooOrder.total || '0'),
    currency,
    status,
  };
}

interface ProfileDataContextValue {
  orders: Order[];
  ordersLoading: boolean;
  user: any;
}

const ProfileDataContext = createContext<ProfileDataContextValue | null>(null);

export function ProfileDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    setOrdersLoading(true);
    getUserOrders(user.email)
      .then((data) => {
        if (Array.isArray(data)) setOrders(data.map(mapWooOrderToProfileOrder));
      })
      .catch((err) => console.error('Kunne ikke hente ordrer:', err))
      .finally(() => setOrdersLoading(false));
  }, [user?.email, user?.id]);

  return (
    <ProfileDataContext.Provider value={{ orders, ordersLoading, user }}>
      {children}
    </ProfileDataContext.Provider>
  );
}

export function useProfileData() {
  const ctx = useContext(ProfileDataContext);
  if (!ctx)
    throw new Error('useProfileData must be used within ProfileDataProvider');
  return ctx;
}
