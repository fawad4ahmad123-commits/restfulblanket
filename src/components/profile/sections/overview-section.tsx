'use client';

import { Mail, Phone, Loader2, ShoppingBag, Truck, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PROFILE_USER, SLEEP_EXPERT } from '../constants/profile-data';
import { profileClasses, profileTheme } from '../constants/profile-theme';
import { OrderRow } from '../order-row';
import { Order } from '../types/profile';
import { useWishlist } from '@/src/core/context/wishlist-provider';

interface OverviewSectionProps {
  orders: Order[];
  loading: boolean;
  user: any;
}

export function OverviewSection({
  orders,
  loading,
  user,
}: OverviewSectionProps) {
  const { wishlistItems } = useWishlist();

  const nightsTarget = 365;
  const nightsOwned = PROFILE_USER.nightsOwned; // no backend field for this yet
  const progress = Math.min(nightsOwned / nightsTarget, 1);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const activeDeliveryCount = orders.filter(
    (o) => o.status === 'on-the-way',
  ).length;

  // Values derived from real data instead of the old static OVERVIEW_STATS array.
  // "warranty" has no backend field yet, so it stays as a fixed policy label.
  const stats = [
    {
      id: 'total-orders',
      label: 'Total orders',
      value: loading ? '...' : String(orders.length),
      icon: ShoppingBag,
    },
    {
      id: 'active-delivery',
      label: 'Active delivery',
      value: loading ? '...' : String(activeDeliveryCount),
      icon: Truck,
    },
    {
      id: 'wishlist',
      label: 'On Wishlist',
      value: String(wishlistItems.length),
      icon: Heart,
    },
    {
      id: 'warranty',
      label: 'Warranty back',
      value: '2 years',
      icon: ShieldCheck,
    },
  ];

  const displayFirstName = user?.name
    ? user.name.split(' ')[0]
    : PROFILE_USER.firstName;

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          profileClasses.heroCard,
          'p-4 sm:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-8',
        )}
      >
        <div
          className="flex-1 p-5 sm:p-8 rounded-2xl"
          style={{ backgroundColor: '#f6eee7' }}
        >
          <h2
            className={cn(
              'mb-3 text-2xl sm:text-3xl leading-tight',
              profileClasses.textPrimary,
            )}
          >
            Sov <span className={profileClasses.serifItalic}>fredeligt</span>.
            <br />
            Lev <span className={profileClasses.serifItalic}>vågen</span>.
          </h2>

          <p className={cn('mb-6 text-sm', profileClasses.textSecondary)}>
            Din {PROFILE_USER.duvetSize} har været hos dig i{' '}
            {nightsOwned} nætter. Her er, hvordan du holder den blød og
            frisk sæson efter sæson.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button className={profileClasses.buttonDark}>
              Se plejevejledning
            </Button>

            <Button variant="outline" className={profileClasses.buttonOutline}>
              Book en søvnekspert
            </Button>
          </div>
        </div>

        <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 self-center">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={profileTheme.colors.border}
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={profileTheme.colors.accentDark}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span
              className={cn(
                'text-2xl font-semibold',
                profileClasses.textPrimary,
              )}
            >
              {nightsOwned}
            </span>

            <span
              className={cn(
                'text-[10px] leading-tight',
                profileClasses.textSecondary,
              )}
            >
              nætter med ro og friskhed
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={cn(profileClasses.surfaceCard, 'p-4')}
            >
              <Icon
                className={cn('h-4 w-4 mb-4 sm:mb-6', profileClasses.textPrimary)}
              />
              <p
                className={cn(
                  'text-lg font-semibold',
                  profileClasses.textPrimary,
                )}
              >
                {stat.value}
              </p>
              <p className={cn('text-xs', profileClasses.textSecondary)}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Latest orders + sleep expert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={cn(profileClasses.surfaceCard, 'p-4 sm:p-5 lg:col-span-2')}>
          <h3 className={cn('text-lg mb-4', profileClasses.textPrimary)}>
            Latest <span className={profileClasses.serifItalic}>orders</span>
          </h3>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#2B2420]" />
              <p className="text-xs text-[#2B2420]/60">Loading orders...</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#EAE1D3]">
              {orders.slice(0, 3).map((order) => (
                <OrderRow key={order.id} order={order} compact />
              ))}
              {orders.length === 0 && (
                <p className="py-6 text-center text-xs text-[#2B2420]/60">
                  No orders found.
                </p>
              )}
            </div>
          )}
        </div>

        <div className={cn(profileClasses.surfaceCard, 'p-4 sm:p-5')}>
          <h3 className={cn('text-lg mb-4', profileClasses.textPrimary)}>
            Your sleep{' '}
            <span className={profileClasses.serifItalic}>expert</span>
          </h3>
          <div className="flex items-start gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SLEEP_EXPERT.avatar}
              alt={SLEEP_EXPERT.name}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p
                className={cn(
                  'text-sm font-medium',
                  profileClasses.textPrimary,
                )}
              >
                {SLEEP_EXPERT.name}
              </p>
              <p className={cn('text-xs', profileClasses.textSecondary)}>
                {SLEEP_EXPERT.title}
              </p>
            </div>
          </div>
          <p className={cn('text-xs mb-4', profileClasses.textSecondary)}>
            {SLEEP_EXPERT.bio}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Email ${SLEEP_EXPERT.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE1D3] hover:bg-[#F3ECE1]"
            >
              <Mail className={cn('h-3.5 w-3.5', profileClasses.textPrimary)} />
            </button>
            <button
              type="button"
              aria-label={`Call ${SLEEP_EXPERT.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE1D3] hover:bg-[#F3ECE1]"
            >
              <Phone
                className={cn('h-3.5 w-3.5', profileClasses.textPrimary)}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}