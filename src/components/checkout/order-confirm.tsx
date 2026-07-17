'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import OrderHeader from '@/src/components/checkout/order-header';
import OrderStatusTimeline from '@/src/components/checkout/order-status-timeline';
import OrderItems from '@/src/components/checkout/order-items';
import OrderShippingPayment from '@/src/components/checkout/order-shipping-payment';
import OrderActions from '@/src/components/checkout/order-actions';

import {
  OrderLoadingState,
  OrderNotFoundState,
} from '@/src/components/checkout/order-confirm-states';

import type { Order } from '@/src/types/order';

import { useCart } from '@/src/core/context/card-Provider';

function formatDate(date?: string) {
  if (!date) return '';

  return new Intl.DateTimeFormat('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

function mapApiOrderToOrder(data: any): Order {
  const cardBrand =
    data.meta_data?.find((m: any) => m.key === '_card_brand')?.value ?? '';

  const last4 =
    data.meta_data?.find((m: any) => m.key === 'last4')?.value ?? '';

  const shippingTitle =
    data.shipping_lines?.[0]?.method_title ?? 'Ingen levering valgt';

  return {
    id: data.id,

    orderNumber: `#${data.number ?? data.id}`,

    customerFirstName: data.billing?.first_name ?? 'kunde',

    confirmationEmail: data.billing?.email ?? '',

    orderDate: formatDate(data.date_created),

    estimatedDeliveryRange:
      data.shipping_lines?.[0]?.method_title
        ?.replace('Free shipping - ', '')
        ?.replace('Estimated arrival: ', '') ?? '',

    status:
      data.status === 'processing'
        ? 'processing'
        : data.status === 'completed'
          ? 'delivered'
          : 'placed',

    statusDates: {
      placed: formatDate(data.date_created),

      processing:
        data.status === 'processing' ? formatDate(data.date_modified) : '',

      shipped: '',

      delivered:
        data.status === 'completed' ? formatDate(data.date_completed) : '',
    },

    items: (data.line_items ?? []).map((item: any) => ({
      id: item.id,

      name: item.name,

      variant: item.global_unique_id ? `Variant: ${item.global_unique_id}` : '',

      price: Number(item.price ?? item.total ?? 0),

      quantity: item.quantity ?? 1,

      imageUrl: item.image?.src ?? '',
    })),

    totals: {
      subtotal: Number(data.total - data.shipping_total),

      shipping: Number(data.shipping_total ?? 0),

      tax: Number(data.total_tax ?? 0),

      totalPaid: Number(data.total ?? 0),

      currency: data.currency ?? 'DKK',
    },

    shippingAddress: {
      name: `${data.shipping?.first_name ?? ''} ${data.shipping?.last_name ?? ''}`,

      city: data.shipping?.city ?? '',

      region: data.shipping?.state ?? '',

      country: data.shipping?.country ?? '',
    },

    shippingMethod: shippingTitle,

    payment: {
      cardBrandLabel: cardBrand,

      last4: last4,
    },
  };
}
export default function OrderConfirmClient() {
  const params = useSearchParams();

  const orderId = params.get('order_id');
  const orderKey = params.get('key');

  const { clearCart } = useCart();

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    if (!orderId || !orderKey) {
      setLoading(false);

      return;
    }

    async function getOrder() {
      try {
        const url = `https://tapbookme.com/wp-json/wc/v3/orders/${orderId}`;
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(
              process.env.NEXT_PUBLIC_WC_CONSUMER_KEY +
                ':' +
                process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
            ).toString('base64')}`,
          },
        });

        const data = await res.json();

        const mappedOrder = mapApiOrderToOrder(data);

        setOrder(mappedOrder);

        // ✅ Order success - empty cart
        if (!cartCleared) {
          clearCart();

          setCartCleared(true);
        }
      } catch (error) {
        console.error('Order fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    getOrder();
  }, [orderId, orderKey, clearCart, cartCleared]);

  if (loading) {
    return <OrderLoadingState />;
  }

  if (!order) {
    return <OrderNotFoundState />;
  }

  return (
    <div className="min-h-screen bg-[#fff9f5] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-serif text-3xl text-[#2B2118]">
          Order Confirmed
        </h1>

        <div className="space-y-6">
          <OrderHeader order={order} />

          <OrderStatusTimeline order={order} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <OrderItems order={order} />

            <OrderShippingPayment order={order} />
          </div>

          <OrderActions orderId={order.id} />
        </div>
      </div>
    </div>
  );
}
