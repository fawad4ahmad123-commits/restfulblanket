import { Minus, Plus } from 'lucide-react';
import { QuantityStepperProps } from './types';

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-1.5 md:gap-3 rounded-full border border-stone-300 px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm">
      <button onClick={onDecrease} className="p-0.5">
        <Minus className="h-2.5 w-2.5 md:h-3 md:w-3 text-stone-600 hover:text-stone-900" />
      </button>

      <span className="min-w-4 text-center font-medium">{value}</span>

      <button onClick={onIncrease} className="p-0.5">
        <Plus className="h-2.5 w-2.5 md:h-3 md:w-3 text-stone-600 hover:text-stone-900" />
      </button>
    </div>
  );
}
