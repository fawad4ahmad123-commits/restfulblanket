'use client';

import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ORDERS,
  OVERVIEW_STATS,
  PROFILE_USER,
  SLEEP_EXPERT,
} from '../constants/profile-data';
import { profileClasses, profileTheme } from '../constants/profile-theme';
import { OrderRow } from '../order-row';

export function OverviewSection() {
  const nightsTarget = 365;
  const progress = Math.min(PROFILE_USER.nightsOwned / nightsTarget, 1);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div
        className={cn(
          profileClasses.heroCard,
          'p-8 flex items-center justify-between gap-8',
        )}
      >
        <div className="max-w-md">
          <h2
            className={cn(
              'text-3xl leading-tight mb-3',
              profileClasses.textPrimary,
            )}
          >
            Sleep <span className={profileClasses.serifItalic}>peacefully</span>
            .
            <br />
            Live <span className={profileClasses.serifItalic}>awake</span>.
          </h2>
          <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
            Your {PROFILE_USER.duvetSize} has been with you for{' '}
            {PROFILE_USER.nightsOwned} nights. Here&apos;s how to keep it soft
            and fresh season after season.
          </p>
          <div className="flex items-center gap-3">
            <Button className={profileClasses.buttonDark}>
              See care guide
            </Button>
            <Button variant="outline" className={profileClasses.buttonOutline}>
              Book a sleep expert
            </Button>
          </div>
        </div>

        <div className="relative h-32 w-32 shrink-0">
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
              {PROFILE_USER.nightsOwned}
            </span>
            <span
              className={cn(
                'text-[10px] leading-tight',
                profileClasses.textSecondary,
              )}
            >
              nights of peace and freshness
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {OVERVIEW_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={cn(profileClasses.surfaceCard, 'p-4')}
            >
              <Icon
                className={cn('h-4 w-4 mb-6', profileClasses.textPrimary)}
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
        <div className={cn(profileClasses.surfaceCard, 'p-5 lg:col-span-2')}>
          <h3 className={cn('text-lg mb-4', profileClasses.textPrimary)}>
            Latest <span className={profileClasses.serifItalic}>orders</span>
          </h3>
          <div className="flex flex-col divide-y divide-[#EAE1D3]">
            {ORDERS.slice(0, 3).map((order) => (
              <OrderRow key={order.id} order={order} compact />
            ))}
          </div>
        </div>

        <div className={cn(profileClasses.surfaceCard, 'p-5')}>
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
