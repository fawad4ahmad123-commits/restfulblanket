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

interface WooAttribute {
  id?: number;
  name: string;
  options?: string[];
  option?: string;
}

interface WooImage {
  id?: number;
  src: string;
  alt?: string;
}

interface WooDimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  featured: boolean;
  average_rating: string;
  rating_count: number;
  weight: string;
  dimensions: WooDimensions;
  images: WooImage[];
  attributes: WooAttribute[];
}

function getAttribute(
  attributes: WooAttribute[] | undefined,
  ...names: string[]
): string {
  if (!attributes?.length) return '';
  const lowerNames = names.map((n) => n.toLowerCase());
  const match = attributes.find((attr) =>
    lowerNames.includes((attr.name ?? '').toLowerCase()),
  );
  if (!match) return '';
  return match.options?.[0] ?? match.option ?? '';
}

function formatSize(dimensions: WooDimensions | undefined): string {
  if (!dimensions) return '';
  const { length, width, height } = dimensions;
  const a = length?.trim();
  const b = height?.trim();
  if (a && b) return `${a} × ${b} cm`;
  if (a && width?.trim()) return `${a} × ${width.trim()} cm`;
  return '';
}

function formatBadge(product: WooProduct): string {
  if (product.featured) return 'Best seller';
  if (product.on_sale) return 'Sale';
  return '';
}

export function formatWooProduct(raw: WooProduct): Product {
  const weightKg = raw.weight ? parseFloat(raw.weight) : 0;

  return {
    id: String(raw.id ?? ''),
    slug: raw.slug ?? '',
    badge: formatBadge(raw),
    title: raw.name ?? '',
    weightKg: Number.isFinite(weightKg) ? weightKg : 0,
    sizeCm: formatSize(raw.dimensions),
    price: raw.price ?? raw.sale_price ?? raw.regular_price ?? '0',
    originalPrice: raw.regular_price ?? raw.price ?? '0',
    rating: raw.average_rating ? parseFloat(raw.average_rating) : 0,
    reviewCount: raw.rating_count ?? 0,
    image: raw.images?.[0]?.src ?? '',
    material: getAttribute(
      raw.attributes,
      'Materiale',
      'Materials',
      'Material',
    ),
    care: getAttribute(raw.attributes, 'Pleje', 'Care', 'Vask', 'Wash'),
  };
}

export function formatWooProducts(
  raw: Array<WooProduct | null | undefined>,
): Product[] {
  return raw.filter((p): p is WooProduct => Boolean(p)).map(formatWooProduct);
}
