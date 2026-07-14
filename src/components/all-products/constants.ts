import { SortOption } from './types';

export const sortOptions: SortOption[] = [
  {
    id: 'price-low-high',
    label: 'Pris (lav til høj)',
    value: 'price-low-high',
  },
  {
    id: 'price-high-low',
    label: 'Pris (høj til lav)',
    value: 'price-high-low',
  },
  {
    id: 'popularity',
    label: 'Popularitet',
    value: 'popularity',
  },
  {
    id: 'latest',
    label: 'Nyeste',
    value: 'latest',
  },
];
