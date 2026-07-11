import { Check } from 'lucide-react';
import type { Order, OrderStatus } from '@/src/types/order';

interface OrderStatusTimelineProps {
  order: Order;
}

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

export default function OrderStatusTimeline({
  order,
}: OrderStatusTimelineProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="bg-white rounded-2xl border border-[#EEE3D6] p-8">
      <h3 className="mb-8 font-serif text-lg text-[#2B2118]">Order Status</h3>

      <div className="flex items-start">
        {STEPS.map((step, index) => {
          const isComplete = index <= currentIndex;
          const isLast = index === STEPS.length - 1;
          const dateForStep = order.statusDates[step.key] ?? '';

          return (
            <div key={step.key} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div className="flex-1">
                  {index !== 0 && (
                    <div
                      className={`h-px w-full ${
                        index <= currentIndex ? 'bg-[#2B2118]' : 'bg-[#E5D9C8]'
                      }`}
                    />
                  )}
                </div>

                <StepDot
                  completed={isComplete}
                  isCurrent={index === currentIndex}
                />

                {!isLast && (
                  <div className="flex-1">
                    <div
                      className={`h-px w-full ${
                        index < currentIndex ? 'bg-[#2B2118]' : 'bg-[#E5D9C8]'
                      }`}
                    />
                  </div>
                )}
              </div>

              <p className="mt-3 text-sm font-medium text-[#2B2118]">
                {step.label}
              </p>
              <p className="mt-0.5 text-xs text-[#A69A8C]">
                {isComplete ? dateForStep : `Est. ${dateForStep}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepDot({
  completed,
  isCurrent,
}: {
  completed: boolean;
  isCurrent: boolean;
}) {
  if (completed) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2B2118]">
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="h-6 w-6 shrink-0 rounded-full border-2 border-[#DAD0C2] bg-white" />
  );
}
