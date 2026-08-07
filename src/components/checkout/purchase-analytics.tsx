'use client';

import { useEffect } from 'react';

export default function PurchaseAnalytics({ order }: { order: any }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', 'purchase', {
      transaction_id: order.orderNumber,
      value: order.totals.totalPaid,
      currency: order.totals.currency,
      items:
        order.items?.map((item: any) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })) || [],
    });
  }, [order]);

  return null;
}
