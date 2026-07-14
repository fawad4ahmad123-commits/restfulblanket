import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from './quantity-selector';
import { AddToCart } from './types';

const AddToCartBar = ({
  quantity,
  onQuantityChange,
  price,
  currency,
  onAddToCart,
  stockQuantity,
}: AddToCart) => {
  const total = price * quantity;

  const isQuantityExceeded =
    stockQuantity !== null &&
    stockQuantity !== undefined &&
    quantity > stockQuantity;

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className="
          flex 
          flex-col 
          gap-3
          xl:flex-row
          xl:items-center
        "
        role="group"
        aria-label="Tilføj til kurv-kontroller"
      >
        {/* Quantity */}
        <div className="w-full xl:w-auto">
          <QuantitySelector
            quantity={quantity}
            onChange={onQuantityChange}
            max={stockQuantity}
            aria-label="Vælg antal"
          />
        </div>

        {/* Add button */}
        <Button
          type="button"
          onClick={onAddToCart}
          disabled={isQuantityExceeded}
          title={
            isQuantityExceeded
              ? 'Den valgte mængde overstiger den tilgængelige lagerbeholdning.'
              : ''
          }
          className="
            h-12
            w-full
            rounded-full
            bg-[#3F3A36]
            px-4
            text-sm
            font-medium
            text-white
            hover:bg-[#2E2A27]

            xl:flex-1
            xl:text-base

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label={`Tilføj ${quantity} vare(r) til kurven. Samlet pris ${currency}${total}`}
        >
          <ShoppingBag className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />

          <span className="whitespace-nowrap">Tilføj til kurv</span>

          <span aria-hidden="true" className="ml-1 whitespace-nowrap">
            · {currency}
            {total}
          </span>

          <span className="sr-only">
            , samlet pris er {currency}
            {total}
          </span>
        </Button>
      </div>

      {isQuantityExceeded && (
        <p className="text-sm leading-5 text-red-500">
          Den valgte mængde overstiger lagerbeholdningen. Kun {stockQuantity}{' '}
          vare
          {stockQuantity && stockQuantity > 1 ? 'r' : ''} er tilgængelig.
        </p>
      )}
    </div>
  );
};

export default AddToCartBar;
