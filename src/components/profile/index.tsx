'use client';

import { useState, useEffect } from 'react';
import { profileClasses } from '@/src/components/profile/constants/profile-theme';
import { ProfileSidebar } from '@/src/components/profile/profile-sidebar';
import { AccountInformationSection } from '@/src/components/profile/sections/account-information-section';
import { AddressesSection } from '@/src/components/profile/sections/addresses-section';
import { CancellationReturnSection } from '@/src/components/profile/sections/cancellation-return-section';
import { OrdersSection } from '@/src/components/profile/sections/orders-section';
import { OverviewSection } from '@/src/components/profile/sections/overview-section';
import { WishlistSection } from '@/src/components/profile/sections/wishlist-section';
import {
  ProfileSectionId,
  Order,
  OrderStatus,
} from '@/src/components/profile/types/profile';
import { useAuth } from '@/src/core/context/auth-context';
import { getUserOrders } from '@/src/lib/orders';

// Helper to map WooCommerce REST API order object to UI Order shape
function mapWooOrderToProfileOrder(wooOrder: any): Order {
  let status: OrderStatus = 'on-the-way';
  if (wooOrder.status === 'completed') {
    status = 'delivered';
  } else if (['cancelled', 'refunded', 'failed'].includes(wooOrder.status)) {
    status = 'regretted';
  }

  const firstItem = wooOrder.line_items?.[0];
  const productName = firstItem?.name || 'Weighted Blanket';

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
    if (sizeMeta) {
      productSubtitle = sizeMeta.value;
    }
  }

  const image =
    firstItem?.image?.src ||
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80';

  const currencySymbols: Record<string, string> = {
    DKK: 'kr. ',
  };
  const currency =
    currencySymbols[wooOrder.currency?.toUpperCase()] ||
    wooOrder.currency ||
    '€';

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

const SECTION_COMPONENTS: Record<
  ProfileSectionId,
  React.ComponentType<{ orders: Order[]; loading: boolean; user: any }>
> = {
  overview: OverviewSection as any,
  orders: OrdersSection as any,
  wishlist: WishlistSection as any,
  addresses: AddressesSection as any,
  account: AccountInformationSection as any,
  cancellation: CancellationReturnSection as any,
};

export default function Profile() {
  const [activeSection, setActiveSection] =
    useState<ProfileSectionId>('overview');
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    // Fetch orders if user is authenticated and has an ID
    if (user?.id) {
      // Find numeric ID if present or parse string ID
      const customerId = parseInt(user.id, 10);
      if (!isNaN(customerId)) {
        setOrdersLoading(true);
        getUserOrders(customerId)
          .then((data) => {
            if (Array.isArray(data)) {
              setOrders(data.map(mapWooOrderToProfileOrder));
            }
          })
          .catch((err) => {
            console.error('Failed to load user orders:', err);
          })
          .finally(() => {
            setOrdersLoading(false);
          });
      }
    }
  }, [user?.id]);

  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className={profileClasses.page}>
      <div className="mx-auto max-w-6xl px-6 py-10 flex gap-10">
        <ProfileSidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
        />
        <main className="flex-1 min-w-0">
          <ActiveComponent
            orders={orders}
            loading={ordersLoading}
            user={user}
          />
        </main>
      </div>
    </div>
  );
}
