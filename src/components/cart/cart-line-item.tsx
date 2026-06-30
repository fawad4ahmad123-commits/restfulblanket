import { Trash2 } from 'lucide-react';
import QuantityStepper from './quantity-stepper';
import { CartLine } from './types';

export default function CartLineItem({
  item,
  onRemove,
  onChangeQty,
}: CartLine) {
  return (
    <div className="flex gap-3 border-b border-stone-200 px-6 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-md object-cover"
      />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <p>{item.name}</p>

          <button onClick={() => onRemove(item.id)}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-stone-500">Color: {item.color}</p>
        <p className="text-xs text-stone-500">
          {item.variant} • {item.weight}
        </p>

        <div className="flex justify-between">
          <span>${item.price.toFixed(2)}</span>

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
