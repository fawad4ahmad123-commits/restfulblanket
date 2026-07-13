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

function mapApiOrderToOrder(data: any): Order {
  return {
    id: data.id,

    orderNumber: data.orderNumber ?? `#${data.id}`,

    customerFirstName:
      data.customerFirstName ?? data.customer?.firstName ?? 'there',

    confirmationEmail: data.email ?? data.customer?.email ?? '',

    orderDate: data.orderDate ?? '',

    estimatedDeliveryRange: data.estimatedDeliveryRange ?? '',

    status: data.status ?? 'placed',

    statusDates: {
      placed: data.statusDates?.placed ?? data.orderDate ?? '',

      processing: data.statusDates?.processing ?? '',

      shipped: data.statusDates?.shipped ?? '',

      delivered: data.statusDates?.delivered ?? '',
    },

    items: (data.items ?? []).map((item: any) => ({
      id: item.id,
      name: item.name,
      variant: item.variant ?? '',
      price: Number(item.price ?? 0),
      quantity: item.quantity ?? 1,
      imageUrl: item.imageUrl ?? item.image ?? '',
    })),

    totals: {
      subtotal: Number(data.totals?.subtotal ?? 0),
      shipping: Number(data.totals?.shipping ?? 0),
      tax: Number(data.totals?.tax ?? 0),
      totalPaid: Number(data.totals?.totalPaid ?? data.total ?? 0),
      currency: data.currency ?? 'USD',
    },

    shippingAddress: {
      name: data.shippingAddress?.name ?? '',

      city: data.shippingAddress?.city ?? '',

      region: data.shippingAddress?.region ?? '',

      country: data.shippingAddress?.country ?? '',
    },

    shippingMethod: data.shippingMethod ?? '',

    payment: {
      cardBrandLabel: data.payment?.cardBrandLabel ?? '',

      last4: data.payment?.last4 ?? '0000',
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

  console.log('t12 order', {
    order,
    orderId,
    orderKey,
  });

  return (
    <div className="min-h-screen bg-[#FAF3EC] px-4 py-12">
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
