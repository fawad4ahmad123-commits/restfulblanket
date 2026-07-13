import { Suspense } from 'react';
import OrderConfirmClient from '@/src/components/checkout/order-confirm';
import { Loader } from '@/src/components/loader';

export const metadata = {
  title: 'Order Confirmation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          <Loader />
        </div>
      }
    >
      <OrderConfirmClient />
    </Suspense>
  );
}
