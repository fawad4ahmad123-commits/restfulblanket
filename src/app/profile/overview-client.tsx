'use client';

import { OverviewSection } from '@/src/components/profile/sections/overview-section';
import { useProfileData } from '@/src/core/context/profile-data-context';

export default function OverviewPageClient() {
  const { orders, ordersLoading, user } = useProfileData();
  return (
    <OverviewSection orders={orders} loading={ordersLoading} user={user} />
  );
}
