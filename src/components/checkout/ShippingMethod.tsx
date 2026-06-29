import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck } from 'lucide-react';

interface ShippingMethodProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export const ShippingMethodComponent: React.FC<ShippingMethodProps> = ({
  selectedMethod,
  onSelect,
}) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Shipping Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedMethod}
          onValueChange={onSelect}
          className="space-y-3"
        >
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="free" id="free" />
              <Label
                htmlFor="free"
                className="font-medium cursor-pointer flex items-center gap-2"
              >
                <Truck className="h-4 w-4 text-muted-foreground" />
                Free Shipping
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">
              Estimated arrival: 15-30 Sep, 25 / $0
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
