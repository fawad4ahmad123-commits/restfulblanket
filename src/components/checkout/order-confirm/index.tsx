'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order?order_id=${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="p-10 text-center">Processing your order...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h1>

      <p className="text-gray-600 mb-6">
        Your order has been successfully placed.
      </p>

      {order && (
        <div className="border p-6 rounded-lg text-left">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> {order.total}
          </p>
        </div>
      )}
    </div>
  );
}
