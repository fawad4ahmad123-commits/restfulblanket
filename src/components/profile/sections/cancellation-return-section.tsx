'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { PROFILE_USER } from '../constants/profile-data';

export function CancellationReturnSection() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // wire up to your return/cancellation mutation
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6"
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="orderNumber"
              className={profileClasses.textSecondary}
            >
              Order number
            </Label>
            <Input
              id="orderNumber"
              placeholder="e.g. RFB-10482"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
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
              placeholder={PROFILE_USER.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
            />
          </div>
          <Button
            type="submit"
            className={cn(profileClasses.buttonDark, 'w-fit')}
          >
            Start undo
          </Button>
        </form>
      </div>
    </div>
  );
}
