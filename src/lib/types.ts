export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { src: string }[];
  categories: { id: number; name: string }[];
};
