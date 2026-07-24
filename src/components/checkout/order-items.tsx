import Image from 'next/image';
import type { Order } from '@/src/types/order';

interface OrderItemsProps {
  order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
  const { items, totals } = order;

  return (
    <div className="bg-white rounded-2xl border border-[#EEE3D6] p-6">
      <h3 className="mb-4 font-serif text-lg text-[#2B2118]">
        Varer ({items.length})
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F0E7D8]">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#2B2118]">
                {item.name}
              </p>
              <p className="text-xs text-[#A69A8C]">{item.variant}</p>
            </div>

            <p className="shrink-0 text-sm font-semibold text-[#2B2118]">
              kr{item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-[#EEE3D6] pt-4 text-sm">
        <SummaryRow label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
        <SummaryRow
          label="Levering"
          value={
            totals.shipping === 0 ? 'Gratis' : `kr${totals.shipping.toFixed(2)}`
          }
        />
        <SummaryRow label="Moms" value={`kr${totals.tax.toFixed(2)}`} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#EEE3D6] pt-4">
        <p className="font-serif text-base text-[#2B2118]">Betalt i alt</p>
        <p className="font-serif text-base font-semibold text-[#2B2118]">
          kr{totals.totalPaid.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#8A7F73]">{label}</span>
      <span className="text-[#2B2118]">{value}</span>
    </div>
  );
}
