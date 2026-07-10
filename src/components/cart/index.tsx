'use client';

import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { CartOffcanvasProps } from './types';
import CartLineItem from './cart-line-item';

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default function CartOffcanvas({
  open,
  onOpenChange,
  items,
  upsellItems = [],
  onRemoveItem,
  onChangeQty,
  onAddUpsell = () => { },
  onContinueShopping = () => { },
}: CartOffcanvasProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [discountOpen, setDiscountOpen] = useState(true);
  const [discountCode, setDiscountCode] = useState('');

  const handleClose = () => onOpenChange(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handleCheckout() {
    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      console.log("CART ITEMS:", items);

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            id: item.id,
            variation_id: item.variationId || 0,
            quantity: item.quantity,
          })),

          shippingAddress: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: 'US',
          },

          shippingMethod: 'free',
        }),
      });

      const data = await response.json();

      console.log("CREATE ORDER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.message || 'Failed to create order'
        );
      }

      if (!data?.pay_url) {
        throw new Error(
          'Payment URL not returned'
        );
      }

      window.location.href = data.pay_url;

    } catch (err: any) {

      console.error(err);

      setCheckoutError(
        err.message || 'Network error. Please try again.'
      );

      setIsCheckingOut(false);
    }
  }

  async function handleApplyDiscount(code: string) {
    if (!code.trim()) return;
    try {
      const res = await fetch('/api/discount/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error || 'Invalid discount code');
      }
    } catch (err) {
      setCheckoutError('Could not apply discount code');
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[85vw] md:w-full md:max-w-md p-0">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#FAF3EC] px-6 text-center">
            <p className="text-sm md:text-base text-stone-600">
              Your cart is empty
            </p>
            <Button
              onClick={() => {
                onContinueShopping();
                handleClose();
              }}
              className="rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 text-white px-6 h-[44px]"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex h-full flex-col bg-[#FAF3EC]">
            <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3.5 md:px-6 md:py-4">
              <h2 className="text-sm md:text-base font-semibold text-stone-900">
                Your Cart ({items.length})
              </h2>
            </div>

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

            <div className="mt-auto">
              <div className="border-t border-stone-200 px-4 py-3 md:px-6 md:py-4">
                <button
                  onClick={() => setDiscountOpen(!discountOpen)}
                  className="flex w-full justify-between items-center text-sm md:text-base font-medium text-stone-900"
                >
                  Apply discount code
                  <ChevronDown
                    className={`h-4 w-4 md:h-5 md:w-5 transition-transform ${discountOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {discountOpen && (
                  <div className="mt-2.5 md:mt-3 flex gap-2">
                    <Input
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="rounded-full h-[38px] md:h-[48px] text-xs md:text-sm bg-white"
                    />
                    <Button
                      onClick={() => handleApplyDiscount(discountCode)}
                      className="rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 h-[38px] md:h-[48px] px-4 md:px-6 py-0 text-xs md:text-sm text-white"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              <div className="border-t border-stone-200 px-4 py-3.5 md:px-6 md:py-4">
                <div className="flex items-start justify-between text-sm md:text-base">
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-stone-900">Subtotal</span>
                    <p className="mt-0.5 text-[10px] md:text-xs text-[#6B6B6B] leading-tight">
                      Shipping & taxes may be re-calculated at checkout
                    </p>
                  </div>
                  <span className="font-semibold text-stone-900 shrink-0 ml-4">
                    kr{subtotal.toFixed(2)}
                  </span>
                </div>

                {checkoutError && (
                  <p className="mt-2 text-xs text-red-600">{checkoutError}</p>
                )}

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="mt-3.5 md:mt-4 h-[44px] md:h-[56px] w-full cursor-pointer rounded-full bg-[#35281E] hover:bg-[#35281E] hover:opacity-100 text-xs md:text-base font-semibold text-white disabled:opacity-60"
                >
                  {isCheckingOut ? 'Redirecting...' : 'Proceed to Checkout'}
                  {!isCheckingOut && (
                    <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
