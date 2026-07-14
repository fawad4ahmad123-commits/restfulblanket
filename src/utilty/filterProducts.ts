import { SelectedFilters } from '../components/all-products/types';

export function filterProducts(
  products: any[],
  filters: SelectedFilters,
  searchQuery: string,
) {
  return products.filter((product) => {
    // CATEGORY FILTER
    console.log('y12', { aaa: product.categories });
    const productCategories = (product.categories || []).map((c: any) =>
      (typeof c === 'string' ? c : c.name || '').toLowerCase().trim(),
    );

    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.some((category) =>
        productCategories.includes(category.toLowerCase().trim()),
      );
    const productColor =
      typeof product.color === 'string'
        ? product.color
        : product.color?.name || '';

    const colorMatch =
      filters.colors.length === 0 || filters.colors.includes(productColor);
    const productWeight =
      typeof product.weight === 'string'
        ? product.weight
        : String(product.weight || '');
    const weightMatch =
      filters.weights.length === 0 || filters.weights.includes(productWeight);
    const productSize =
      typeof product.dimensions === 'string'
        ? product.dimensions
        : product.dimensions?.name || '';
    const sizeMatch =
      filters.sizes.length === 0 || filters.sizes.includes(productSize);
    const price = Number(product.price) || 0;
    const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;

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
