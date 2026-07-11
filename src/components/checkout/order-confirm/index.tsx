'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderSuccessClient() {
  const params = useSearchParams();

  const orderId = params.get('order_id');
  const orderKey = params.get('key');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !orderKey) {
      setLoading(false);
      return;
    }

    async function getOrder() {
      try {
        const res = await fetch(`/api/order/${orderId}?key=${orderKey}`);

        const data = await res.json();

        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getOrder();
  }, [orderId, orderKey]);

  if (loading) {
    return <div className="p-10 text-center">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-10 text-center">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF3EC] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#35281E]">Thank You 🎉</h1>

        <p className="mt-3 text-gray-600">
          Your order has been placed successfully.
        </p>

        <div className="mt-6 text-left">
          <p>
            Order ID:
            <strong>#{order.id}</strong>
          </p>

          <p>
            Status:
            <strong>{order.status}</strong>
          </p>

          <p>
            Total:
            <strong>
              {order.total} {order.currency}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
