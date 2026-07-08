'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from '../types/profile';
import { profileClasses } from '../constants/profile-theme';
import { OrderRow } from '../order-row';
import { Loader2 } from 'lucide-react';

type Filter = 'all' | OrderStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'on-the-way', label: 'On the way' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'regretted', label: 'Regretted' },
];

interface OrdersSectionProps {
  orders: Order[];
  loading: boolean;
}

export function OrdersSection({ orders, loading }: OrdersSectionProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div>
      <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
        My <span className={profileClasses.serifItalic}>Orders</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        Overview of all your purchases and deliveries
      </p>

      <div className="flex items-center gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f.id
                ? profileClasses.navItemActive
                : 'bg-white border border-[#EAE1D3] text-[#2B2420]/80 hover:bg-[#F3ECE1]',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={cn(profileClasses.surfaceCard, 'p-5')}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#2B2420]" />
            <p className={cn('text-sm', profileClasses.textSecondary)}>
              Loading your orders...
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[#EAE1D3]">
            {filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
            {filteredOrders.length === 0 && (
              <p
                className={cn(
                  'py-8 text-center text-sm',
                  profileClasses.textSecondary,
                )}
              >
                No orders in this category yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
