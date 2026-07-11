import OrderConfirmClient from '@/src/components/checkout/order-confirm';
import { Loader } from '@/src/components/loader';
import { Suspense } from 'react';

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
