export interface ProductColor {
  id: string;
  label: string;
  hex: string;
  hexSecondary?: string;
}

export interface ProductWeightOption {
  id: string;
  label: string;
  inStock: boolean;
}

export interface ProductSizeOption {
  id: string;
  label: string;
  inStock: boolean;
}

export interface ProductFeature {
  id: string;
  text: string;
}

export interface ProductInfoSection {
  id: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  name: string;
  breadcrumbs: string[];
  badge?: string;
  rating: number;
  reviewCount: number;
  price: number;
  compareAtPrice?: number;
  currency: string;
  features: ProductFeature[];
  colors: ProductColor[];
  weights: ProductWeightOption[];
  sizes: ProductSizeOption[];
  images: string[];
  infoSections: ProductInfoSection[];
}

export interface AddToCart {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  price: number;
  currency: string;
  onAddToCart: () => void;
}

export interface FaqItem {
  id: string;
  title: string;
  body?: string;
}

export interface DetailRow {
  id: string;
  label: string;
  value: string;
}

export interface TemperatureAttribute {
  id: string;
  label: string;
  icon: "cool" | "medium" | "warm";
  active: boolean;
}

export interface ProductInformation {
  heading: string;
  headingItalic: string;
  faqs: FaqItem[];
  detailsTitle: string;
  details: DetailRow[];
  attributesTitle: string;
  temperatureLabel: string;
  temperatureOptions: TemperatureAttribute[];
}