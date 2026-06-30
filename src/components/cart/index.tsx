import { Sheet, SheetContent } from '@/components/ui/sheet';
import FilledCart from './filled-cart';
import EmptyCart from './empty-cart';
import { CartOffcanvasProps } from './types';

export default function CartOffcanvas({
  open,
  onOpenChange,
  items,
  upsellItems = [],
  onRemoveItem,
  onChangeQty,
  onAddUpsell = () => {},
  onApplyDiscount = () => {},
  onCheckout,
  onContinueShopping = () => {},
}: CartOffcanvasProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md p-0">
        {items.length === 0 ? (
          <EmptyCart
            onClose={handleClose}
            onContinueShopping={onContinueShopping}
          />
        ) : (
          <FilledCart
            items={items}
            upsellItems={upsellItems}
            onClose={handleClose}
            onRemoveItem={onRemoveItem}
            onChangeQty={onChangeQty}
            onAddUpsell={onAddUpsell}
            onApplyDiscount={onApplyDiscount}
            onCheckout={onCheckout}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
