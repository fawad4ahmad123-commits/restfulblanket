import { Check } from 'lucide-react';
import type { Order } from '@/src/types/order';

interface OrderHeaderProps {
  order: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EEE3D6] p-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#DCE8DC]">
        <Check className="h-6 w-6 text-[#3E6B4F]" strokeWidth={2.5} />
      </div>

      <h2 className="font-serif text-xl text-[#2B2118]">
        Tak for din ordre, {order.customerFirstName}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#8A7F73]">
        Din ordre er blevet gennemført. Vi har sendt en bekræftelse til{' '}
        {order.confirmationEmail}, og vi giver dig besked, når din ordre bliver
        sendt.
      </p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-[#E5D9C8] rounded-xl bg-[#F6EEE2] py-4">
        <MetaField label="Ordrenummer" value={order.orderNumber} />
        <MetaField label="Ordredato" value={order.orderDate} />
        <MetaField
          label="Forventet levering"
          value={order.estimatedDeliveryRange}
        />
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 text-center">
      <p className="text-[11px] uppercase tracking-wide text-[#A69A8C]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#2B2118]">{value}</p>
    </div>
  );
}
