'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { ADDRESSES } from '../constants/profile-data';

export function AddressesSection() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
            Your <span className={profileClasses.serifItalic}>Addresses</span>
          </h2>
          <p className={cn('text-sm', profileClasses.textSecondary)}>
            Used for billing and delivery of your orders
          </p>
        </div>
        <Button className={cn(profileClasses.buttonDark, 'gap-1.5')}>
          <Plus className="h-4 w-4" />
          Add new address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ADDRESSES.map((address) => (
          <div
            key={address.id}
            className={cn(profileClasses.surfaceCard, 'p-5')}
          >
            <h3
              className={cn(
                'text-sm font-semibold mb-3',
                profileClasses.textPrimary,
              )}
            >
              {address.label}
            </h3>
            <div
              className={cn(
                'text-sm space-y-0.5 mb-4',
                profileClasses.textSecondary,
              )}
            >
              <p className={profileClasses.textPrimary}>{address.fullName}</p>
              <p>{address.street}</p>
              <p>
                {address.postalCode} {address.city}
              </p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>
            <button
              type="button"
              className={cn(
                'text-sm font-medium underline underline-offset-2',
                profileClasses.textPrimary,
              )}
            >
              Edit address →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
