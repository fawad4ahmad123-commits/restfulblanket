'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { OrderSummary } from './types';

interface OrderSummaryProps {
  summary: OrderSummary;
  discountCode: string;
  onDiscountChange: (code: string) => void;
  onApplyDiscount: () => void;
  termsAccepted: boolean;
  confirmationAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  onConfirmationChange: (accepted: boolean) => void;
  onPlaceOrder: () => void;
  isSubmitting?: boolean;
}

export const OrderSummaryComponent: React.FC<OrderSummaryProps> = ({
  summary,
  discountCode,
  onDiscountChange,
  onApplyDiscount,
  termsAccepted,
  confirmationAccepted,
  onTermsChange,
  onConfirmationChange,
  onPlaceOrder,
  isSubmitting = false,
}) => {
  return (
    <Card className="border shadow-sm sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="outline" className="font-normal">
            Items ({summary.items.length})
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {summary.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-xs">
                  {item.size}
                  {item.size && item.weight ? ', ' : ''}
                  {item.weight}
                </p>
              </div>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="text-sm font-medium">Apply discount code</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Coupon Code"
              value={discountCode}
              onChange={(e) => onDiscountChange(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={onApplyDiscount}>
              Apply
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>${summary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${summary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => onTermsChange(!!checked)}
              className="mt-0.5"
            />
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer"
            >
              I have read and agree to the{' '}
              <span className="text-primary underline">Terms & Conditions</span>{' '}
              and <span className="text-primary underline">Privacy Policy</span>
              .
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="confirmation"
              checked={confirmationAccepted}
              onCheckedChange={(checked) => onConfirmationChange(!!checked)}
              className="mt-0.5"
            />
            <Label
              htmlFor="confirmation"
              className="text-sm font-normal cursor-pointer"
            >
              I confirm that I have selected the correct blanket size and
              weight.
            </Label>
          </div>
        </div>

        <Button
          className="w-full gap-2"
          size="lg"
          onClick={onPlaceOrder}
          disabled={!termsAccepted || !confirmationAccepted || isSubmitting}
        >
          <Lock className="h-4 w-4" />
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </CardContent>
    </Card>
  );
};
