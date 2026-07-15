'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { PROFILE_USER } from '../constants/profile-data';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const CANCEL_ORDER_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/cancel-order';

export function CancellationReturnSection() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const resetResponse = () => {
    setTimeout(() => {
      setResponse({ type: null, message: '' });
    }, 5000);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setResponse({
        type: 'error',
        message: 'Please enter your order number.',
      });
      resetResponse();
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setResponse({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      resetResponse();
      return;
    }

    setIsLoading(true);
    setResponse({ type: null, message: '' });

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

      setResponse({
        type: 'success',
        message:
          data.message ||
          'Your order has been cancelled successfully. You will receive a confirmation email shortly.',
      });

      setOrderNumber('');
      setEmail('');

      resetResponse();
    } catch (error: any) {
      console.error('Cancel order error:', error);
      setResponse({
        type: 'error',
        message:
          error.message || 'An unexpected error occurred. Please try again.',
      });
      resetResponse();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
        Cancellation &amp;{' '}
        <span className={profileClasses.serifItalic}>return</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        You have a 30-day right of withdrawal on all orders.
      </p>

      <div className={cn(profileClasses.surfaceCard, 'p-6 max-w-2xl')}>
        <h3 className={cn('text-lg mb-1', profileClasses.textPrimary)}>
          Start an <span className={profileClasses.serifItalic}>undo</span>
        </h3>
        <p className={cn('text-sm mb-5', profileClasses.textSecondary)}>
          Select the order you wish to cancel. We will refund via your original
          payment method within 14 days of receiving the returned item.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="orderNumber"
                className={profileClasses.textSecondary}
              >
                Order number
              </Label>
              <Input
                id="orderNumber"
                placeholder="e.g. 12345"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="returnEmail"
                className={profileClasses.textSecondary}
              >
                Email address
              </Label>
              <Input
                id="returnEmail"
                type="email"
                placeholder={PROFILE_USER.email || 'your-email@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {response.type && (
            <div
              className={cn(
                'p-4 rounded-lg flex items-start gap-3',
                response.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800',
              )}
            >
              {response.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {response.type === 'success' ? 'Success!' : 'Error'}
                </p>
                <p className="text-sm">{response.message}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(profileClasses.buttonDark, 'w-fit')}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              'Start undo'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
