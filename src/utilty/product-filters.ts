import { SelectedFilters } from '../components/all-products/types';
import { parsePrice } from './use-parse-price';

export function ProductFilters(
  products: any[],
  filters: SelectedFilters,
  searchQuery: string,
) {
  return products.filter((product) => {
    const productCategories = (product.categories || []).map((c: any) =>
      (typeof c === 'string' ? c : c.name || '').toLowerCase().trim(),
    );

    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.some((category) =>
        productCategories.includes(category.toLowerCase().trim()),
      );

    const getProductColors = (product: any): string[] => {
      const colorSet = new Set<string>();

      if (Array.isArray(product.attributeLinks)) {
        product.attributeLinks
          .filter((attr: any) => attr.name === 'color')
          .forEach((attr: any) => {
            const label = attr.label || attr.value || attr.name || '';
            if (label) colorSet.add(String(label).toLowerCase().trim());
          });
      }

      if (Array.isArray(product.colors)) {
        product.colors.forEach((c: any) => {
          const label =
            typeof c === 'string' ? c : c.label || c.value || c.name || '';
          if (label) colorSet.add(String(label).toLowerCase().trim());
        });
      }

      if (typeof product.color === 'string' && product.color.trim()) {
        colorSet.add(product.color.toLowerCase().trim());
      }

      return Array.from(colorSet);
    };

    const productColors = getProductColors(product);
    const colorMatch =
      filters.colors.length === 0 ||
      filters.colors.some((color) =>
        productColors.includes(String(color).toLowerCase().trim()),
      );

    const getProductWeights = (product: any): string[] => {
      const weightSet = new Set<string>();

      if (Array.isArray(product.weights)) {
        product.weights.forEach((w: any) => {
          const label =
            typeof w === 'string' ? w : w.label || w.value || w.name || '';
          if (label) weightSet.add(String(label).toLowerCase().trim());
        });
      }

      if (typeof product.weight === 'string' && product.weight.trim()) {
        weightSet.add(product.weight.toLowerCase().trim());
      }

      return Array.from(weightSet);
    };

    const productWeights = getProductWeights(product);
    const weightMatch =
      filters.weights.length === 0 ||
      filters.weights.some((weight) =>
        productWeights.includes(String(weight).toLowerCase().trim()),
      );

    const getProductSizes = (product: any): string[] => {
      const sizeSet = new Set<string>();

      if (Array.isArray(product.sizes)) {
        product.sizes.forEach((s: any) => {
          const label =
            typeof s === 'string' ? s : s.label || s.value || s.name || '';
          if (label) sizeSet.add(String(label).toLowerCase().trim());
        });
      }

      if (typeof product.dimensions === 'string' && product.dimensions.trim()) {
        sizeSet.add(product.dimensions.toLowerCase().trim());
      }

      if (typeof product.size === 'string' && product.size.trim()) {
        sizeSet.add(product.size.toLowerCase().trim());
      }

      return Array.from(sizeSet);
    };

    const productSizes = getProductSizes(product);
    const sizeMatch =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) =>
        productSizes.includes(String(size).toLowerCase().trim()),
      );

    const price = parsePrice(product.price);
    const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;

    const searchMatch =
      searchQuery.trim() === '' ||
      product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      product.title?.toLowerCase().includes(searchQuery.trim().toLowerCase());

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
