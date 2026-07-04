'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { OrderSummary } from './types';

const formatCurrency = (value: number): string =>
  `${value.toFixed(2).replace('.', ',')} kr.`;

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
  const [itemsOpen, setItemsOpen] = useState(true);
  const [discountOpen, setDiscountOpen] = useState(true);

  return (
    <Card className="border-none shadow-none  sticky top-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-normal font-serif text-[#35281E]">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <button
            type="button"
            onClick={() => setItemsOpen((o) => !o)}
            className="flex w-full items-center justify-between py-2 text-sm text-[#35281E]"
          >
            <span>Items ({summary.items.length})</span>
            {itemsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {itemsOpen && (
            <div className="space-y-4 pt-2">
              {summary.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-md object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-md bg-[#E8DCD1] flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[#35281E] truncate">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      color : {item.color}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      size: {item.size}
                      {item.size && item.weight ? ', ' : ''}
                    </p>
                  </div>
                  <span className="font-medium text-sm text-[#35281E]">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />
        <div>
          <button
            type="button"
            onClick={() => setDiscountOpen((o) => !o)}
            className="flex w-full items-center justify-between py-2 text-sm text-[#35281E]"
          >
            <span>Apply discount code</span>
            {discountOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {discountOpen && (
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Coupon Code"
                value={discountCode}
                onChange={(e) => onDiscountChange(e.target.value)}
                className="flex-1 rounded-full bg-white border-[#E8DCD1]"
              />
              <Button
                variant="outline"
                onClick={onApplyDiscount}
                className="rounded-full bg-[#35281E] text-[#FFF9F5] hover:bg-[#2a1f18] border-none px-6"
              >
                Apply
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2 text-sm text-[#35281E]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(summary.shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatCurrency(summary.tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold text-[#35281E]">
          <span>Total</span>
          <span>{formatCurrency(summary.total)}</span>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => onTermsChange(!!checked)}
              className="h-5 w-5 rounded-[4px] border-[#B9AFA5] flex-shrink-0"
            />
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer text-[#35281E] whitespace-nowrap overflow-hidden text-ellipsis"
            >
              I have read and agree to the{' '}
              <span className="underline">Terms &amp; Conditions</span> and{' '}
              <span className="underline">Privacy Policy</span>.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmation"
              checked={confirmationAccepted}
              onCheckedChange={(checked) => onConfirmationChange(!!checked)}
              className="h-5 w-5 rounded-[4px] border-[#B9AFA5] flex-shrink-0"
            />
            <Label
              htmlFor="confirmation"
              className="text-sm font-normal cursor-pointer text-[#35281E] whitespace-nowrap overflow-hidden text-ellipsis"
            >
              I confirm that I have selected the correct blanket size and
              weight.
            </Label>
          </div>
        </div>

        <Button
          className="w-full rounded-full bg-[#35281E] text-[#FFF9F5] hover:bg-[#2a1f18]"
          size="lg"
          onClick={onPlaceOrder}
          disabled={!termsAccepted || !confirmationAccepted || isSubmitting}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </CardContent>
    </Card>
  );
};
