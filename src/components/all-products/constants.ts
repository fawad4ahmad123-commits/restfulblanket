import { FilterCategory, Product, SortOption } from './types';

export const SHOP_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nord Classic Weighted Blanket',
    category: 'Best Seller',
    color: 'Brown',
    image: '/product/bestselller.png',
    weight: '12 kg',
    dimensions: '150 × 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.9,
    reviewCount: 1264,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Nord Classic Weighted Blanket',
    category: 'Best Seller',
    color: 'Cream',
    image: '/product/bestselller.png',
    weight: '7 kg',
    dimensions: '150 × 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.9,
    reviewCount: 1264,
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Nord Classic Weighted Blanket',
    category: 'Best Seller',
    color: 'Gray',
    image: '/product/bestselller.png',
    weight: '9 kg',
    dimensions: '130 × 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.9,
    reviewCount: 1264,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Luxury Silk Duvet',
    category: 'New Arrival',
    color: 'Cream',
    image: '/product/bestselller.png',
    weight: '12 kg',
    dimensions: '150 × 200 cm',
    price: 189,
    originalPrice: 249,
    currency: '€',
    rating: 4.8,
    reviewCount: 894,
    isNewArrival: true,
  },
  {
    id: '5',
    name: 'Cooling Bamboo Blanket',
    category: 'On Discount',
    color: 'Gray',
    image: '/product/bestselller.png',
    weight: '5 kg',
    dimensions: '55 × 180 cm',
    price: 159,
    originalPrice: 199,
    currency: '€',
    rating: 4.7,
    reviewCount: 623,
    isOnDiscount: true,
    discountPercentage: 20,
  },
  {
    id: '6',
    name: 'Nord Classic Weighted Blanket',
    category: 'Best Seller',
    color: 'Brown',
    image: '/product/bestselller.png',
    weight: '12 kg',
    dimensions: '150 × 200 cm',
    price: 249,
    originalPrice: 299,
    currency: '€',
    rating: 4.9,
    reviewCount: 1264,
    isBestSeller: true,
  },
];

export const filterCategories: FilterCategory[] = [
  {
    id: 'all',
    label: 'All Product',
    type: 'category',
    count: 32,
    children: [
      { id: 'adult', label: 'For Adult' },
      { id: 'kids', label: 'For Kids' },
      { id: 'duvets', label: 'For Duvets' },
      { id: 'accessories', label: 'For Accessories' },
    ],
  },

  {
    id: 'new-arrival',
    label: 'New Arrival',
    type: 'category',
  },

  {
    id: 'best-seller',
    label: 'Best Seller',
    type: 'category',
  },

  {
    id: 'on-discount',
    label: 'On Discount',
    type: 'category',
  },

  {
    id: 'colors',
    label: 'Colors',
    type: 'color',
    colors: [
      { id: 'brown', name: 'Brown', hex: '#655245' },
      { id: 'cream', name: 'Cream', hex: '#D8D0C4' },
      { id: 'gray', name: 'Gray', hex: '#9B9B9B' },
      { id: 'light-gray', name: 'Light Gray', hex: '#D9D9D9' },
    ],
  },

  {
    id: 'weights',
    label: 'Weights',
    type: 'weight',
    options: ['12 kg', '7 kg', '8 kg', '9 kg'],
  },

  {
    id: 'size',
    label: 'Size',
    type: 'size',
    options: ['150 × 200 cm', '150 × 500 cm', '200 × 220 cm'],
  },

  {
    id: 'prices',
    label: 'Prices',
    type: 'price',
    minPrice: 100,
    maxPrice: 550,
  },
];

export const activeFilters = ['Best Seller', '130 × 200 cm', '12 kg'];

export const sortOptions: SortOption[] = [
  {
    id: 'price-low-high',
    label: 'Price (Low-High)',
    value: 'price-low-high',
  },
  {
    id: 'price-high-low',
    label: 'Price (High-Low)',
    value: 'price-high-low',
  },
  {
    id: 'popularity',
    label: 'Popularity',
    value: 'popularity',
  },
  {
    id: 'latest',
    label: 'Latest',
    value: 'latest',
  },
];
