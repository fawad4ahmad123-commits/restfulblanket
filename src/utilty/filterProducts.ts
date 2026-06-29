import { SelectedFilters } from '../components/all-products/types';

export function filterProducts(
  products: any[],
  filters: SelectedFilters,
  searchQuery: string,
) {
  return products.filter((product) => {
    const categoryMatch =
      filters.categories.length === 0 ||
      (product.categories || []).some((c: string) =>
        filters.categories.includes(c),
      );

    const colorMatch =
      filters.colors.length === 0 || filters.colors.includes(product.color);

    const weightMatch =
      filters.weights.length === 0 || filters.weights.includes(product.weight);

    const sizeMatch =
      filters.sizes.length === 0 || filters.sizes.includes(product.dimensions);

    const priceMatch =
      Number(product.price) >= filters.minPrice &&
      Number(product.price) <= filters.maxPrice;

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
