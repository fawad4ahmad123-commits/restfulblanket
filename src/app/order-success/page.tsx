import { Suspense } from 'react';
import { Loader } from '@/src/components/loader';
import OrderConfirmClient from '@/src/components/checkout/order-confirm';

export const metadata = {
  title: 'Order Confirmation',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ order_id?: string; key?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { order_id: orderId, key: orderKey } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          <Loader />
        </div>
      }
    >
      <OrderConfirmClient orderId={orderId} orderKey={orderKey} />
    </Suspense>
  );
}
