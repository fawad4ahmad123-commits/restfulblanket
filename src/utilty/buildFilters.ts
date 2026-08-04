import { SelectedFilters } from '../components/all-products/types';

export function buildFilters(products: any[]) {
  console.log('t12 colors', { products });
  return {
    categories: [
      ...new Set(products.flatMap((product) => product.categories || [])),
    ],
    colors: [
      ...new Set(
        products.flatMap((product) => product.colors || []).filter(Boolean),
      ),
    ],
    weights: [
      ...new Set(
        products.flatMap((product) => product.weights || []).filter(Boolean),
      ),
    ],
    sizes: [
      ...new Set(
        products.flatMap((product) => product.sizes || []).filter(Boolean),
      ),
    ],
    minPrice:
      products.length > 0
        ? Math.min(...products.map((product) => Number(product.price)))
        : 0,
    maxPrice:
      products.length > 0
        ? Math.max(...products.map((product) => Number(product.price)))
        : 0,
  };
}

export function getInitialFilters(
  minPrice: number,
  maxPrice: number,
): SelectedFilters {
  return {
    categories: [],
    colors: [],
    weights: [],
    sizes: [],
    minPrice,
    maxPrice,
  };
}
