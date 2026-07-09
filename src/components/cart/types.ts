export interface CartItem {
  id: string;
  name: string;
  color: string;
  variant: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  productId?: number;
  variationId?: number;
}

export interface UpsellItem {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: number;
  image: string;
}

export interface QuantityStepperProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export interface CartLine {
  item: CartItem;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
}

export interface CartOffcanvasProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  items: CartItem[];
  upsellItems?: UpsellItem[];

  onRemoveItem: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;

  onAddUpsell?: (id: string) => void;
  onApplyDiscount?: (code: string) => void;

  onCheckout: () => void;
  onContinueShopping?: () => void;
}
