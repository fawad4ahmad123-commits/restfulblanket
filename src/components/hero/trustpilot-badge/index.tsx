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
    <div className="flex w-full flex-wrap items-center justify-start gap-4 py-5">
      <div className="flex flex-wrap items-center gap-3 pr-2">
        <VisaIcon />
        <MastercardIcon />
        <QuickPayIcon />
        <ApplePayIcon />
        <VabillIcon />
      </div>
      <TrustpilotBadge />
    </div>
  );
}
