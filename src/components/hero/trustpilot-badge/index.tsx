import {
  ApplePayIcon,
  MastercardIcon,
  QuickPayIcon,
  TrustpilotBadge,
  VabillIcon,
  VisaIcon,
} from './payment-card-icons';

export default function PaymentTrustBadge() {
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
