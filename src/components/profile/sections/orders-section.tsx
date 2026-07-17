'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from '../types/profile';
import { profileClasses } from '../constants/profile-theme';
import { OrderRow } from '../order-row';
import { Loader2 } from 'lucide-react';
import { Loader } from '../../loader';

type Filter = 'all' | OrderStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Alle' },
  { id: 'on-the-way', label: 'På vej' },
  { id: 'delivered', label: 'Leveret' },
  { id: 'regretted', label: 'Fortrudt' },
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
        Mine <span className={profileClasses.serifItalic}>ordrer</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        Oversigt over alle dine køb og leveringer
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
            <Loader />
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
                Ingen ordrer i denne kategori endnu.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
