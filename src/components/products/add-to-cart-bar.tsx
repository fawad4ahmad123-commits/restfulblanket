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
  stockQuantity,
}: AddToCart) => {
  const total = price * quantity;

  const isOutOfStock =
    stockQuantity !== null &&
    stockQuantity !== undefined &&
    stockQuantity > 0 &&
    quantity > stockQuantity;

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center gap-3"
        role="group"
        aria-label="Add to cart controls"
      >
        <QuantitySelector
          quantity={quantity}
          onChange={onQuantityChange}
          max={stockQuantity}
          aria-label="Select quantity"
        />

        <Button
          type="button"
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="h-12 flex-1 rounded-full bg-[#3F3A36] text-base font-medium text-white hover:bg-[#2E2A27] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Add ${quantity} item(s) to cart. Total price ${currency}${total}`}
        >
          <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />

          <span>Add to Cart</span>

          <span aria-hidden="true">
            {" "}
            · {currency}
            {total}
          </span>

          <span className="sr-only">
            , total price is {currency}
            {total}
          </span>
        </Button>
      </div>

      {stockQuantity !== null &&
        stockQuantity !== undefined &&
        stockQuantity > 0 &&
        quantity >= stockQuantity && (
          <p className="text-sm text-red-500">
            Only {stockQuantity} item
            {stockQuantity > 1 ? "s" : ""} available in stock.
          </p>
        )}
    </div>
  );
};

export default AddToCartBar;
