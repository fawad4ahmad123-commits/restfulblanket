import OrderHeader from '@/src/components/checkout/order-header';
import OrderStatusTimeline from '@/src/components/checkout/order-status-timeline';
import OrderItems from '@/src/components/checkout/order-items';
import OrderShippingPayment from '@/src/components/checkout/order-shipping-payment';
import OrderActions from '@/src/components/checkout/order-actions';

import { OrderNotFoundState } from '@/src/components/checkout/order-confirm-states';

import ClearCartOnMount from './clear-cart-on-mount';
import { mapApiOrderToOrder } from './order-mapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface OrderConfirmClientProps {
  orderId?: string;
  orderKey?: string;
}

async function getOrder(orderId: string) {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials');
  }

  const url = `https://tapbookme.com/wp-json/wc/v3/orders/${orderId}`;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`WooCommerce API error: ${res.status}`);
  }

  const data = await res.json();

  return mapApiOrderToOrder(data);
}

export default async function OrderConfirmClient({
  orderId,
  orderKey,
}: OrderConfirmClientProps) {
  if (!orderId || !orderKey) {
    return <OrderNotFoundState />;
  }

  const order = await getOrder(orderId);

  if (!order) {
    return <OrderNotFoundState />;
  }

  return (
    <div className="min-h-screen bg-[#fff9f5] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <ClearCartOnMount />
        <h1 className="mb-8 text-center font-serif text-3xl text-[#2B2118]">
          Ordre bekræftet
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
