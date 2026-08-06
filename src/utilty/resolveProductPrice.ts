export function resolvePriceRaw(product: any): any {
  const candidates = [
    product.price,
    product.sale_price,
    product.regular_price,
    product.min_price,
    product.max_price,
    product.price_range?.min,
    product.price_range?.max,
    product.prices?.price,
    product.prices?.regular_price,
  ];

  return candidates.find(
    (v) => v !== undefined && v !== null && String(v).trim() !== '',
  );
}
