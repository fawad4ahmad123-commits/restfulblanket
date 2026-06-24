import { Product } from '../types/product';

const NAMES = [
  'Nord Classic Weighted Blanket',
  'ScottDesign Weighted Blanket',
  'Nord Classic Weighted Blanket',
];

export const products: Product[] = Array.from({ length: 24 }, (_, i) => {
  const name = NAMES[i % NAMES.length];
  return {
    id: `prod-${i + 1}`,
    name,
    category: i % 3 === 0 ? 'Blanket' : i % 3 === 1 ? 'Pillow' : 'Throw',
    size: ['S', 'M', 'L'][i % 3],
    price: 249 + (i % 5) * 10,
    originalPrice: i % 4 === 0 ? 349 + (i % 5) * 10 : undefined,
    image: `https://picsum.photos/seed/towel-${i}/600/450`,
    isNew: i % 5 === 0,
  };
});
