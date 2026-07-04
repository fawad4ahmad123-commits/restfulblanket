'use client';

import React, { useContext, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import {
  ShippingAddress,
  PaymentDetails,
} from '@/src/components/checkout/types';
import { ShippingAddressComponent } from '@/src/components/checkout/ShippingAddress';
import { ShippingMethodComponent } from '@/src/components/checkout/ShippingMethod';
import { PaymentMethodComponent } from '@/src/components/checkout/PaymentMethod';
import { OrderSummaryComponent } from '@/src/components/checkout/OrderSummary';
import { CartContext } from '@/src/core/context/cart-context';

const CheckoutPage: React.FC = () => {
  const cart = useContext(CartContext);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    saveForFuture: false,
  });

  const [shippingMethod, setShippingMethod] = useState('free');

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: 'credit',
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    sameAsShipping: false,
  });

  const [discountCode, setDiscountCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmationAccepted, setConfirmationAccepted] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  const shippingCosts: Record<string, number> = {
    free: 0,
    regular: 10,
    express: 20,
  };
  const shipping = shippingCosts[shippingMethod] ?? 0;
  const tax = subtotal * 0.25;
  const total = subtotal + shipping + tax;

  const handlePaymentUpdate = (data: Partial<PaymentDetails>) => {
    setPaymentDetails((prev) => ({ ...prev, ...data }));
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress,
          shippingMethod,
          paymentMethod: paymentDetails.paymentMethod, // ✅ FIXED
          cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order failed');
      }

      window.location.href = data.payment_url;
    } catch (err: any) {
      console.error(err);
      setOrderError(err.message || 'Order failed. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9f6]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold text-[#35281E]">Checkout</h1>
        </div>

        {orderError && (
          <div className="mb-6 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {orderError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShippingAddressComponent
              address={shippingAddress}
              onUpdate={setShippingAddress}
            />

            <ShippingMethodComponent
              selectedMethod={shippingMethod}
              onSelect={setShippingMethod}
            />

            <PaymentMethodComponent
              paymentMethod={paymentDetails.paymentMethod}
              cardHolder={paymentDetails.cardHolder}
              cardNumber={paymentDetails.cardNumber}
              expiryDate={paymentDetails.expiryDate}
              securityCode={paymentDetails.securityCode}
              sameAsShipping={paymentDetails.sameAsShipping}
              onUpdate={handlePaymentUpdate}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummaryComponent
              summary={{
                items: cartItems.map((i: any) => ({
                  id: i.id,
                  name: i.name,
                  size: i.variant || '',
                  weight: i.weight || '',
                  price: i.price,
                  image: i.image || '',
                  color: i.color || '',
                })),
                subtotal,
                shipping,
                tax,
                total,
              }}
              discountCode={discountCode}
              onDiscountChange={setDiscountCode}
              onApplyDiscount={() => alert(`Discount ${discountCode} applied`)}
              termsAccepted={termsAccepted}
              confirmationAccepted={confirmationAccepted}
              onTermsChange={setTermsAccepted}
              onConfirmationChange={setConfirmationAccepted}
              onPlaceOrder={handlePlaceOrder}
              isSubmitting={isPlacingOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
