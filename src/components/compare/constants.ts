export interface Product {
  id: string;
  slug: string;
  badge: string;
  title: string;
  weightKg: number;
  sizeCm: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviewCount: number;
  image: string;
  material: string;
  care: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'classic',
    slug: 'nord-classic-weighted-blanket',
    badge: 'Best seller',
    title: 'Nord Classic Weighted Blanket',
    weightKg: 7,
    sizeCm: '150 × 200 cm',
    price: '249',
    originalPrice: '289',
    rating: 4.9,
    reviewCount: 1284,
    image:
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=800&auto=format&fit=crop',
    material: 'Linen and glass beads',
    care: 'Spot clean',
  },
  {
    id: 'lite',
    slug: 'nord-lite-blanket',
    badge: 'Best seller',
    title: 'Nord Lite Blanket',
    weightKg: 4,
    sizeCm: '150 × 200 cm',
    price: '249',
    originalPrice: '289',
    rating: 4.6,
    reviewCount: 1284,
    image:
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=800&auto=format&fit=crop',
    material: 'Cotton',
    care: 'Machine wash',
  },
];

export interface SpecRow {
  label: string;
  getValue: (product: Product) => string;
}

export const SPEC_ROWS: SpecRow[] = [
  { label: 'Vægt', getValue: (p) => `${p.weightKg} kg` },
  { label: 'Størrelse', getValue: (p) => p.sizeCm },
  { label: 'Materiale', getValue: (p) => p.material },
  { label: 'Pleje', getValue: (p) => p.care },
  { label: 'Bedømmelse', getValue: (p) => p.rating.toFixed(1) },
];

export const BREADCRUMB_ITEMS = [
  { label: 'Forside', href: '/' },
  { label: 'Sammenlign produkter', href: '/compare' },
];
