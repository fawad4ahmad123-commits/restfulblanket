import { SelectedFilters } from '../components/all-products/types';

export function filterProducts(
  products: any[],
  filters: SelectedFilters,
  searchQuery: string,
) {
  return products.filter((product) => {
    // CATEGORY FILTER
    const productCategories = (product.categories || []).map((c: any) =>
      (typeof c === 'string' ? c : c.name || '').toLowerCase().trim(),
    );

    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.some((category) =>
        productCategories.includes(category.toLowerCase().trim()),
      );
    const productColors = (
      Array.isArray(product.colors)
        ? product.colors
        : [
            typeof product.color === 'string'
              ? product.color
              : product.color?.name || '',
          ]
    )
      .filter(Boolean)
      .map((c: any) => String(c).toLowerCase().trim());

    const colorMatch =
      filters.colors.length === 0 ||
      filters.colors.some((color) =>
        productColors.includes(String(color).toLowerCase().trim()),
      );

    const productWeights = (
      Array.isArray(product.weights)
        ? product.weights
        : [
            typeof product.weight === 'string'
              ? product.weight
              : String(product.weight || ''),
          ]
    )
      .filter(Boolean)
      .map((w: any) => String(w).toLowerCase().trim());

    const weightMatch =
      filters.weights.length === 0 ||
      filters.weights.some((weight) =>
        productWeights.includes(String(weight).toLowerCase().trim()),
      );

    const productSizes = (
      Array.isArray(product.sizes)
        ? product.sizes
        : [
            typeof product.dimensions === 'string'
              ? product.dimensions
              : product.dimensions?.name || '',
          ]
    )
      .filter(Boolean)
      .map((s: any) => String(s).toLowerCase().trim());

    const sizeMatch =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) =>
        productSizes.includes(String(size).toLowerCase().trim()),
      );
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
