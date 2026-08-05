'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  orderId: string;
  orderKey: string;
}

export default function WithdrawForm({ orderId, orderKey }: Props) {
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/withdraw', {
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
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for withdrawal"
      />

      <Button onClick={handleSubmit}>Submit Withdrawal Request</Button>
    </div>
  );
}
