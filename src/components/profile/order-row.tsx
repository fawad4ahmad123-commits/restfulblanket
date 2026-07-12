import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Order } from './types/profile';
import { profileClasses } from './constants/profile-theme';
import { StatusBadge } from './status-badge';

interface OrderRowProps {
  order: Order;
  /** compact = used inside the Overview "Latest orders" card */
  compact?: boolean;
}

function actionLabel(order: Order) {
  if (order.status === 'on-the-way') return 'Track package';
  if (order.status === 'regretted') return 'See details';
  return 'View invoice';
}

export function OrderRow({ order, compact = false }: OrderRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4',
        compact ? 'py-3 first:pt-0 last:pb-0' : 'py-4 first:pt-0 last:pb-0',
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={order.image}
        alt={order.productName}
        className="h-12 w-12 rounded-lg object-cover shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm font-medium truncate',
            profileClasses.textPrimary,
          )}
        >
          {order.productName} — {order.productSubtitle}
        </p>
        <p className={cn('text-xs', profileClasses.textSecondary)}>
          Order {order.orderNumber} · {order.date}
        </p>
      </div>

      {!compact && (
        <p
          className={cn(
            'hidden sm:block text-sm font-semibold w-20 text-right',
            profileClasses.textPrimary,
          )}
        >
          {order.currency}
          {order.price.toFixed(2)}
        </p>
      )}

      <StatusBadge status={order.status} />

      <Button
        variant="outline"
        size="sm"
        className="rounded-full border-[#2B2420] text-[#2B2420] hover:bg-[#2B2420]/5 whitespace-nowrap w-full sm:w-auto order-last sm:order-none"
      >
        {actionLabel(order)}
      </Button>
    </div>
  );
}