import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, Wallet, Apple } from 'lucide-react';
import { PaymentDetails } from './types';

interface PaymentMethodProps extends PaymentDetails {
  onUpdate: (data: Partial<PaymentDetails>) => void;
}

export const PaymentMethodComponent: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  cardHolder,
  cardNumber,
  expiryDate,
  securityCode,
  sameAsShipping,
  onUpdate,
}) => {
  const paymentOptions = [
    { id: 'credit', label: 'Credit Card', icon: CreditCard },
    { id: 'mobile', label: 'Mobile Pay', icon: Smartphone },
    { id: 'paypal', label: 'PayPal', icon: Wallet },
    {
      id: 'google',
      label: 'Google Pay',
      icon: () => <span className="font-bold text-sm">G</span>,
    },
    { id: 'apple', label: 'Apple Pay', icon: Apple },
  ];

  return (
    <Card className="border shadow-sm border-[#E9DDD4]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                type="button"
                variant={paymentMethod === option.id ? 'default' : 'outline'}
                className="
  flex flex-col items-center gap-1 
  h-auto py-3 px-2 
  bg-[#E9DDD4] 
  text-[#35281E]
  hover:bg-[#E9DDD4]
  hover:text-[#35281E]
  focus:bg-[#E9DDD4]
  focus:text-[#35281E]
  focus:outline-none
  focus:ring-0
  active:bg-[#E9DDD4]
"
                onClick={() => onUpdate({ paymentMethod: option.id })}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{option.label}</span>
              </Button>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardHolder">Card Holder Name</Label>
            <Input
              id="cardHolder"
              placeholder="First & Last Name"
              value={cardHolder}
              onChange={(e) => onUpdate({ cardHolder: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => onUpdate({ cardNumber: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => onUpdate({ expiryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security">Security Code</Label>
              <Input
                id="security"
                placeholder="CVC"
                value={securityCode}
                onChange={(e) => onUpdate({ securityCode: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="sameAsShipping"
              checked={sameAsShipping}
              onCheckedChange={(checked) =>
                onUpdate({ sameAsShipping: !!checked })
              }
            />
            <Label
              htmlFor="sameAsShipping"
              className="text-sm font-normal cursor-pointer"
            >
              Same as shipping information
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
