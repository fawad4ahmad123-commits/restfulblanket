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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#35281E">
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className='text-[#736760]'>Name</Label>
            <Input
              id="name"
              placeholder="First & Last Name"
              value={address.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className='text-[#736760]'>Address</Label>
            <Input
              id="address"
              placeholder="Your Complete Address"
              value={address.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#736760]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@gmail.com"
                value={address.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#736760]">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 890"
                value={address.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-[#736760]">
                City
              </Label>
              <Input
                id="city"
                placeholder="Ottawa"
                value={address.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-[#736760]">
                State
              </Label>
              <Input
                id="state"
                placeholder="Ontario"
                value={address.state}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip" className="text-[#736760]">
                Zip
              </Label>
              <Input
                id="zip"
                placeholder="Zip Code"
                value={address.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
              />
            </div>
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
