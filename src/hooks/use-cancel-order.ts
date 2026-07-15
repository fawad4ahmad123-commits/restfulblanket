import { useState } from 'react';

const CANCEL_ORDER_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/cancel-order';

interface CancelOrderResponse {
  success: boolean;
  status?: string;
  message?: string;
}

export function useCancelOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState<CancelOrderResponse | null>(
    null,
  );

  const cancelOrder = async (orderNumber: string, email: string) => {
    if (!orderNumber.trim()) {
      setError('Please enter your order number.');
      return null;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return null;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(CANCEL_ORDER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: orderNumber.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found. Please check your order number.');
        } else if (response.status === 403) {
          throw new Error(
            'This email does not match the order. Please use the email used for purchase.',
          );
        } else if (response.status === 409) {
          throw new Error(
            'This order can no longer be cancelled. Contact support for assistance.',
          );
        } else {
          throw new Error(
            data.message || 'Failed to cancel order. Please try again.',
          );
        }
      }

      setSuccess(true);
      setResponseData(data);
      return data;
    } catch (error: any) {
      setError(
        error.message || 'An unexpected error occurred. Please try again.',
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setResponseData(null);
  };

  return {
    cancelOrder,
    isLoading,
    error,
    success,
    responseData,
    reset,
  };
}
