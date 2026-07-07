import { cn } from '@/lib/utils';
import { OrderStatus } from './types/profile';
import { profileTheme } from './constants/profile-theme';

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config = profileTheme.status[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        config.bg,
        config.text,
      )}
    >
      {config.label}
    </span>
  );
}
