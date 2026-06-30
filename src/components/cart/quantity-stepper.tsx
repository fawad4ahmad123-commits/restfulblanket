import { Minus, Plus } from 'lucide-react';
import { QuantityStepperProps } from './types';

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-stone-300 px-2 py-1">
      <button onClick={onDecrease}>
        <Minus className="h-3 w-3" />
      </button>

      <span>{value}</span>

      <button onClick={onIncrease}>
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
