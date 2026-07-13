import { SelectedFilters } from '../components/all-products/types';

export function filterProducts(
  products: any[],
  filters: SelectedFilters,
  searchQuery: string,
) {
  return products.filter((product) => {
    // CATEGORY FILTER
    const productCategories = (product.categories || []).map((c: any) =>
      typeof c === 'string' ? c : c.name,
    );

    const categoryMatch =
      filters.categories.length === 0 ||
      productCategories.some((category: string) =>
        filters.categories.includes(category),
      );

    // COLOR FILTER
    const productColor =
      typeof product.color === 'string'
        ? product.color
        : product.color?.name || '';

    const colorMatch =
      filters.colors.length === 0 || filters.colors.includes(productColor);

    // WEIGHT FILTER
    const productWeight =
      typeof product.weight === 'string'
        ? product.weight
        : String(product.weight || '');

    const weightMatch =
      filters.weights.length === 0 || filters.weights.includes(productWeight);

    // SIZE FILTER
    const productSize =
      typeof product.dimensions === 'string'
        ? product.dimensions
        : product.dimensions?.name || '';

    const sizeMatch =
      filters.sizes.length === 0 || filters.sizes.includes(productSize);

    // PRICE FILTER
    const price = Number(product.price) || 0;

    const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;

    // SEARCH FILTER
    const searchMatch =
      searchQuery.trim() === '' ||
      product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return (
      categoryMatch &&
      colorMatch &&
      weightMatch &&
      sizeMatch &&
      priceMatch &&
      searchMatch
    );
  });
}
