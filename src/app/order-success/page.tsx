import OrderConfirmClient from '@/src/components/checkout/order-confirm';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <OrderConfirmClient />
    </Suspense>
  );
}
