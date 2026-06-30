import { useState } from 'react';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UpsellItem {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: number;
  image: string;
}

interface EmptyCartProps {
  onClose: () => void;
  onContinueShopping: () => void;
}

function EmptyCart({ onClose, onContinueShopping }: EmptyCartProps) {
  return (
    <div className="flex h-full flex-col bg-[#FAF3EC]">
      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
        <h2 className="font-serif text-lg text-stone-900">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-stone-500 transition hover:text-stone-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-300 text-stone-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              d="M6 7h12l-1 12.5a1 1 0 01-1 .9H8a1 1 0 01-1-.9L6 7z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 7V5a3 3 0 016 0v2" strokeLinecap="round" />
            <path d="M4 4l16 16" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-serif text-lg text-stone-900">Your cart is empty</p>
        <Button
          onClick={onContinueShopping}
          className="rounded-full bg-stone-900 px-6 py-5 text-sm font-medium text-white hover:bg-stone-800"
        >
          Continue shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface QuantityStepperProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-stone-300 px-2 py-1">
      <button
        onClick={onDecrease}
        className="flex h-5 w-5 items-center justify-center text-stone-500 transition hover:text-stone-900"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="w-3 text-center text-sm text-stone-800">{value}</span>
      <button
        onClick={onIncrease}
        className="flex h-5 w-5 items-center justify-center text-stone-500 transition hover:text-stone-900"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
}

function CartLineItem({ item, onRemove, onChangeQty }: CartLineItemProps) {
  return (
    <div className="flex gap-3 border-b border-stone-200 px-6 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-stone-900">{item.name}</p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-stone-400 transition hover:text-stone-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-stone-500">
          ({item.variant}), ({item.weight})
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-900">
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

interface UpsellRowProps {
  item: UpsellItem;
  onAdd: (id: string) => void;
}

function UpsellRow({ item, onAdd }: UpsellRowProps) {
  const [size, setSize] = useState(item.size);

  return (
    <div className="flex items-center gap-3 px-6 py-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-14 w-14 shrink-0 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stone-900">{item.name}</p>
          <span className="text-sm font-medium text-stone-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-full border border-stone-300 px-2 py-1 text-xs text-stone-600">
            <span className="h-3 w-3 rounded-full bg-[#E4C9A8] border border-stone-300" />
            <ChevronDown className="h-3 w-3" />
          </button>
          <button className="flex items-center gap-1 rounded-full border border-stone-300 px-2 py-1 text-xs text-stone-600">
            {size}
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => onAdd(item.id)}
        className="rounded-full bg-stone-900 px-4 text-xs font-medium text-white hover:bg-stone-800"
      >
        Add
      </Button>
    </div>
  );
}

interface FilledCartProps {
  items: CartItem[];
  upsellItems: UpsellItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
  onAddUpsell: (id: string) => void;
  onApplyDiscount: (code: string) => void;
  onCheckout: () => void;
}

function FilledCart({
  items,
  upsellItems,
  onClose,
  onRemoveItem,
  onChangeQty,
  onAddUpsell,
  onApplyDiscount,
  onCheckout,
}: FilledCartProps) {
  const [discountOpen, setDiscountOpen] = useState(true);
  const [discountCode, setDiscountCode] = useState('');

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="flex h-full flex-col bg-[#FAF3EC]">
      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
        <h2 className="font-serif text-lg text-stone-900">
          Your Cart ({items.length})
        </h2>
        <button
          onClick={onClose}
          className="text-stone-500 transition hover:text-stone-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div>
          {items.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
              onRemove={onRemoveItem}
              onChangeQty={onChangeQty}
            />
          ))}
        </div>

        {upsellItems.length > 0 && (
          <div className="mt-2 border-t border-stone-200 bg-[#FAF3EC]">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-sm font-medium text-stone-900">
                Complete your sleep setup
              </p>
              <div className="flex items-center gap-2">
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-300 text-stone-500 hover:text-stone-900">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-white">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-stone-200">
              {upsellItems.map((item) => (
                <UpsellRow key={item.id} item={item} onAdd={onAddUpsell} />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-stone-200 px-6 py-4">
          <button
            onClick={() => setDiscountOpen((o) => !o)}
            className="flex w-full items-center justify-between text-sm font-medium text-stone-900"
          >
            Apply discount code
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                discountOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {discountOpen && (
            <div className="mt-3 flex gap-2">
              <Input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code here"
                className="rounded-full border-stone-300 bg-transparent text-sm placeholder:text-stone-400"
              />
              <Button
                onClick={() => onApplyDiscount(discountCode)}
                className="shrink-0 rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-800"
              >
                Apply
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-stone-200 px-6 py-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-900">Subtotal</span>
          <span className="text-sm font-medium text-stone-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <p className="mb-4 text-xs text-stone-500">
          Shipping & taxes may be re-calculated at checkout
        </p>
        <Button
          onClick={onCheckout}
          className="w-full rounded-full bg-stone-900 py-5 text-sm font-medium text-white hover:bg-stone-800"
        >
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
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
      <SheetContent
        side="right"
        className="w-full max-w-md border-l border-stone-200 p-0 [&>button]:hidden"
      >
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
