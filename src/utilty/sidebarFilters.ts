import { getProductsColorHex } from '@/src/helper/color-hexa';

export function buildSidebarFilters(filterOptions: {
  categories: string[];
  colors: string[];
  weights: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
}) {
  return [
    {
      id: 'all',
      label: 'All Product',
      type: 'category',
      count: [...new Set(filterOptions.categories)].length,
      children: [...new Set(filterOptions.categories)].map((category) => ({
        id: category,
        label: category,
      })),
    },
    {
      id: 'colors',
      label: 'Colors',
      type: 'color',
      colors: [...new Set(filterOptions.colors)].map((color) => ({
        id: color,
        name: color,
        hex: getProductsColorHex(color),
      })),
    },
    {
      id: 'weights',
      label: 'Weights',
      type: 'weight',
      options: [...new Set(filterOptions.weights)],
    },
    {
      id: 'size',
      label: 'Size',
      type: 'size',
      options: [...new Set(filterOptions.sizes)],
    },
    {
      id: 'prices',
      label: 'Prices',
      type: 'price',
      minPrice: filterOptions.minPrice,
      maxPrice: filterOptions.maxPrice,
    },
  ];
}
