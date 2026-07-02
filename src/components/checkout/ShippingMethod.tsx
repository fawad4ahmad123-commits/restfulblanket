'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ShippingMethodProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const shippingOptions = [
  {
    id: 'free',
    title: 'Free Shipping',
    estimate: 'Estimated arrival: 15-30 Sep, 25',
    price: '$0',
  },
  {
    id: 'regular',
    title: 'Regular Shipping',
    estimate: 'Estimated arrival: 11-20 Sep, 25',
    price: '$10',
  },
  {
    id: 'express',
    title: 'Express Shipping',
    estimate: 'Estimated arrival: 7-10 Sep, 25',
    price: '$20',
  },
];

export const ShippingMethodComponent: React.FC<ShippingMethodProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  const selected =
    shippingOptions.find((item) => item.id === selectedMethod) ||
    shippingOptions[0];

  const handleShippingChange = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <Card className="overflow-hidden border border-[#EAE4DF] bg-white shadow-sm">
      <CardContent className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-[#392A22]">
          Shipping Method
        </h3>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full rounded-2xl border border-[#E7DCD4] p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium text-[#392A22]">
                  {selected.title}
                </p>

                <p className="mt-1 text-sm text-[#8A7E77]">
                  {selected.estimate} /{' '}
                  <span className="font-semibold text-[#392A22]">
                    {selected.price}
                  </span>
                </p>
              </div>

              <ChevronDown
                className={`h-5 w-5 text-[#6F625B] transition-transform duration-200 ${open ? 'rotate-180' : ''
                  }`}
              />
            </div>
          </button>

          {open && (
            <div className="overflow-hidden rounded-2xl border border-[#EEE7E2] bg-[#FAF8F6]">
              <RadioGroup
                value={selectedMethod}
                onValueChange={handleShippingChange}
              >
                {shippingOptions.map((option, index) => (
                  <label
                    key={option.id}
                    htmlFor={option.id}
                    className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-white ${index !== shippingOptions.length - 1
                        ? 'border-b border-[#E9E3DE]'
                        : ''
                      }`}
                  >
                    <div>
                      <p className="text-[15px] font-medium text-[#392A22]">
                        {option.title}
                      </p>

                      <p className="mt-1 text-sm text-[#8A7E77]">
                        {option.estimate} /{' '}
                        <span className="font-semibold text-[#392A22]">
                          {option.price}
                        </span>
                      </p>
                    </div>

                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="border-[#CFC2B8]"
                    />
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};