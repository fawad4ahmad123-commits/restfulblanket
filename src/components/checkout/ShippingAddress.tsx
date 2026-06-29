import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShippingAddress } from './types';

interface ShippingAddressProps {
  address: ShippingAddress;
  onUpdate: (address: ShippingAddress) => void;
}

export const ShippingAddressComponent: React.FC<ShippingAddressProps> = ({
  address,
  onUpdate,
}) => {
  const handleChange = (
    field: keyof ShippingAddress,
    value: string | boolean,
  ) => {
    onUpdate({ ...address, [field]: value });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="First & Last Name"
              value={address.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your Complete Address"
              value={address.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@gmail.com"
              value={address.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Ottawa"
                value={address.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={address.state}
                onValueChange={(value: any) => handleChange('state', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ON">Ontario</SelectItem>
                  <SelectItem value="QC">Quebec</SelectItem>
                  <SelectItem value="BC">British Columbia</SelectItem>
                  <SelectItem value="AB">Alberta</SelectItem>
                  <SelectItem value="MB">Manitoba</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">Zip</Label>
            <Input
              id="zip"
              placeholder="Zip Code"
              value={address.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="saveForFuture"
              checked={address.saveForFuture}
              onCheckedChange={(checked) =>
                handleChange('saveForFuture', !!checked)
              }
            />
            <Label
              htmlFor="saveForFuture"
              className="text-sm font-normal cursor-pointer"
            >
              Save for future purchases
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
