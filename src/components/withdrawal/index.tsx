'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  orderId: string;
  orderKey: string;
}

export default function WithdrawForm({ orderId, orderKey }: Props) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          orderKey,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed');
      }

      setSuccess(true);
      setReason('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />

        <h3 className="text-xl font-semibold text-green-800">
          Withdrawal Request Submitted
        </h3>

        <p className="mt-2 text-green-700">
          Your request has been successfully submitted and will be reviewed
          shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E9DDD4] bg-white p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#35281E]">
            Reason for Withdrawal
          </label>

          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={6}
            placeholder="Please describe the reason for your withdrawal request..."
            className="resize-none border-[#E9DDD4] focus-visible:ring-[#35281E]"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="h-12 w-full bg-[#35281E] text-white hover:bg-[#2B201A]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Withdrawal Request
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
