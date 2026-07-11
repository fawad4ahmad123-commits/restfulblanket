import { CreditCard } from 'lucide-react';
import type { Order } from '@/src/types/order';

interface OrderShippingPaymentProps {
  order: Order;
}

export default function OrderShippingPayment({
  order,
}: OrderShippingPaymentProps) {
  const { shippingAddress, shippingMethod, payment } = order;

  return (
    <div className="bg-white rounded-2xl border border-[#EEE3D6] p-6">
      <h3 className="mb-4 font-serif text-lg text-[#2B2118]">
        Shipping & Payment
      </h3>

      <div className="space-y-3">
        <InfoBlock label="Shipping Address">
          <p className="text-sm text-[#2B2118]">
            {shippingAddress.name} {shippingAddress.city},{' '}
            {shippingAddress.region} {shippingAddress.country}
          </p>
        </InfoBlock>

        <InfoBlock label="Shipping Method">
          <p className="text-sm text-[#2B2118]">{shippingMethod}</p>
        </InfoBlock>

        <InfoBlock label="Payment">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#8A7F73]" />
            <p className="text-sm text-[#2B2118]">
              •••• •••• •••• {payment.last4}
            </p>
          </div>
        </InfoBlock>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-[#F6EEE2] px-4 py-3">
      <p className="text-xs font-semibold text-[#2B2118]">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
