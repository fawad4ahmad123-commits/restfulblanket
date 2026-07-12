import OrderConfirmClient from '@/src/components/checkout/order-confirm';
import { Loader } from '@/src/components/loader';
import { ProtectedRoute } from '@/src/core/context/auth-context';
import { Suspense } from 'react';

export const metadata = {
  title: 'Order Confirmation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="p-10 text-center">
            <Loader />
          </div>
        }
      >
        <OrderConfirmClient />
      </Suspense>
    </ProtectedRoute>
  );
}
