import {
  ApplePayIcon,
  MastercardIcon,
  QuickPayIcon,
  TrustpilotBadge,
  VabillIcon,
  VisaIcon,
} from './payment-card-icons';

interface PaymentTrustBadgeProps {
  isShop?: boolean;
}

export default function PaymentTrustBadge({
  isShop = false,
}: PaymentTrustBadgeProps) {
  if (isShop) {
    return (
      <div className="flex w-full flex-col items-center py-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <VisaIcon />
          <MastercardIcon />
          <QuickPayIcon />
          <ApplePayIcon />
          <VabillIcon />
        </div>

        <div className="mt-3">
          <TrustpilotBadge />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-3 py-5">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <VisaIcon />
        <MastercardIcon />
        <QuickPayIcon />
        <ApplePayIcon />
        <VabillIcon />
      </div>

      <div className="basis-full sm:basis-auto">
        <TrustpilotBadge />
      </div>
    </div>
  );
}
