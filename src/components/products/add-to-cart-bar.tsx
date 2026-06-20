import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./quantity-selector";
import { AddToCart } from "./types";

const AddToCartBar = ({
  quantity,
  onQuantityChange,
  price,
  currency,
  onAddToCart,
}: AddToCart) => {
  const total = price * quantity;

  return (
    <div
      className="flex items-center gap-3"
      role="group"
      aria-label="Add to cart controls"
    >
      <QuantitySelector
        quantity={quantity}
        onChange={onQuantityChange}
        aria-label="Select quantity"
      />

      <Button
        type="button"
        onClick={onAddToCart}
        className="h-12 flex-1 rounded-full bg-[#3F3A36] text-base font-medium text-white hover:bg-[#2E2A27]"
        aria-label={`Add ${quantity} item(s) to cart. Total price ${currency}${total}`}
      >
        <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />

        <span>Add to Cart</span>

        <span aria-hidden="true">
          · {currency}
          {total}
        </span>

        <span className="sr-only">
          , total price is {currency}
          {total}
        </span>
      </Button>
    </div>
  );
};

export default AddToCartBar;
