'use client';
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import {
  OrderSummary,
  PaymentData,
  ShippingAddress,
} from '@/src/components/checkout/types';
import { ShippingAddressComponent } from '@/src/components/checkout/ShippingAddress';
import { ShippingMethodComponent } from '@/src/components/checkout/ShippingMethod';
import { PaymentMethodComponent } from '@/src/components/checkout/PaymentMethod';
import { OrderSummaryComponent } from '@/src/components/checkout/OrderSummary';

const CheckoutPage: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    email: '',
    city: '',
    state: '',
    phone: '',
    zip: '',
    saveForFuture: false,
  });

  const [shippingMethod, setShippingMethod] = useState('free');
  const [paymentData, setPaymentData] = useState<PaymentData>({
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

  const orderSummary: OrderSummary = {
    items: [
      {
        id: '1',
        name: 'Weighted Blankets "Children"',
        size: '(100×140 cm)',
        weight: '(4 kg)',
        price: 28.99,
      },
      {
        id: '2',
        name: 'Weighted Blankets "Adult"',
        size: '(120×160 cm)',
        weight: '(8 kg)',
        price: 28.99,
      },
    ],
    subtotal: 57.98,
    shipping: 0,
    tax: 8.99,
    total: 66.97,
  };

  const handleShippingUpdate = (address: ShippingAddress) => {
    setShippingAddress(address);
  };

  const handlePaymentUpdate = (data: Partial<PaymentData>) => {
    setPaymentData((prev) => ({ ...prev, ...data }));
  };

  const handleApplyDiscount = () => {
    alert(`Discount code "${discountCode}" applied!`);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully! 🎉');
  };

  return (
    <div className="min-h-screen bg-[#fff9f5]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#35281E] text-center">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShippingAddressComponent
              address={shippingAddress}
              onUpdate={handleShippingUpdate}
            />

            <ShippingMethodComponent
              selectedMethod={shippingMethod}
              onSelect={setShippingMethod}
            />

            <PaymentMethodComponent
              {...paymentData}
              onUpdate={handlePaymentUpdate}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummaryComponent
              summary={orderSummary}
              discountCode={discountCode}
              onDiscountChange={setDiscountCode}
              onApplyDiscount={handleApplyDiscount}
              termsAccepted={termsAccepted}
              confirmationAccepted={confirmationAccepted}
              onTermsChange={setTermsAccepted}
              onConfirmationChange={setConfirmationAccepted}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
