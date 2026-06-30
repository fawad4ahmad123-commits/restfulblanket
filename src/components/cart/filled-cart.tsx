import CartHeader from './cart-header';
import CartLineItem from './cart-line-item';
import DiscountSection from './discount-section';
import CartFooter from './cart-footer';
import { CartItem, UpsellItem } from './types';

interface Props {
  items: CartItem[];
  upsellItems: UpsellItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
  onAddUpsell: (id: string) => void;
  onApplyDiscount: (code: string) => void;
  onCheckout: () => void;
}

export default function FilledCart({
  items,
  onRemoveItem,
  onChangeQty,
  onApplyDiscount,
  onCheckout,
}: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex h-full flex-col bg-[#FAF3EC]">
      <CartHeader title={`Your Cart (${items.length})`} />

      {/* Scrollable products */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onRemove={onRemoveItem}
            onChangeQty={onChangeQty}
          />
        ))}
      </div>

      {/* Always stays at bottom */}
      <div className="mt-auto">
        <DiscountSection onApplyDiscount={onApplyDiscount} />
        <CartFooter subtotal={subtotal} onCheckout={onCheckout} />
      </div>
    </div>
  );
}
