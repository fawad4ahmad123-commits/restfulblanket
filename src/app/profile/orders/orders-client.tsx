'use client';

import { OrdersSection } from '@/src/components/profile/sections/orders-section';
import { useProfileData } from '@/src/core/context/profile-data-context';

export default function OrdersPageClient() {
  const { orders, ordersLoading } = useProfileData();
  return <OrdersSection orders={orders} loading={ordersLoading} />;
}
