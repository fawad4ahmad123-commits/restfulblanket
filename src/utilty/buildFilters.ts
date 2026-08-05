import { SelectedFilters } from '../components/all-products/types';

export function buildFilters(products: any[]) {
  const extractColorLabel = (c: any): string => {
    if (typeof c === 'string') return c.trim();
    return (c?.label || c?.value || c?.name || '').trim();
  };

  const getProductColors = (product: any): string[] => {
    const colorSet = new Set<string>();

    if (Array.isArray(product.attributeLinks)) {
      product.attributeLinks
        .filter((attr: any) => attr.name === 'color')
        .forEach((attr: any) => {
          const label = extractColorLabel(attr);
          if (label) colorSet.add(label);
        });
    }

    if (Array.isArray(product.colors)) {
      product.colors.forEach((c: any) => {
        const label = extractColorLabel(c);
        if (label) colorSet.add(label);
      });
    }

    if (typeof product.color === 'string' && product.color.trim()) {
      colorSet.add(product.color.trim());
    }

    return Array.from(colorSet);
  };

  const parsePrice = (val: any): number => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const cleaned = val.replace(/[^0-9.,]/g, '').replace(',', '.');
      return parseFloat(cleaned) || 0;
    }
    return 0;
  };

  const allColors = products.flatMap(getProductColors).filter(Boolean);
  const prices = products.map((p) => parsePrice(p.price)).filter((p) => p > 0);

  return {
    categories: [
      ...new Set(products.flatMap((product) => product.categories || [])),
    ],
    colors: [...new Set(allColors)],
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
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
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
