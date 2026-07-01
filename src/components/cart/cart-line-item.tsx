import { Trash2 } from 'lucide-react';
import QuantityStepper from './quantity-stepper';
import { CartLine } from './types';

export default function CartLineItem({
  item,
  onRemove,
  onChangeQty,
}: CartLine) {
  return (
    <div className="flex gap-2 md:gap-3 border-b border-stone-200 px-4 py-3 md:px-6 md:py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-14 w-14 md:h-16 md:w-16 rounded-md object-cover shrink-0"
      />

      <div className="flex flex-1 flex-col gap-0.5 md:gap-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-xs md:text-sm font-medium text-stone-900 truncate">
            {item.name}
          </p>

          <button
            onClick={() => onRemove(item.id)}
            className="shrink-0 p-1 -m-1"
          >
            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-stone-500 hover:text-stone-900" />
          </button>
        </div>

        <p className="text-[10px] md:text-xs text-stone-500">
          Color: {item.color}
        </p>
        <p className="text-[10px] md:text-xs text-stone-500">
          {item.variant} • {item.weight}
        </p>

        <div className="flex justify-between items-center mt-1">
          <span className="text-xs md:text-sm font-medium">
            ${item.price.toFixed(2)}
          </span>

          <QuantityStepper
            value={item.quantity}
            onDecrease={() => onChangeQty(item.id, -1)}
            onIncrease={() => onChangeQty(item.id, 1)}
          />
        </div>
      </div>
    </div>
  );
}
