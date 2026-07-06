'use server';
import { WooProduct } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL!;

const KEY = process.env.WC_CONSUMER_KEY!;
const SECRET = process.env.WC_CONSUMER_SECRET!;

/**
 * Helper to build authenticated WooCommerce URL
 */
function wcUrl(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}/wp-json/wc/v3/${path}`);

  url.searchParams.set('consumer_key', KEY);
  url.searchParams.set('consumer_secret', SECRET);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.set(k, String(v));
    });
  }

  return url.toString();
}

/* -----------------------------
   CREATE REVIEW
------------------------------*/
export async function createProductReview({
  productId,
  review,
  reviewer,
  reviewerEmail,
  rating,
  reviewTitle,
}: {
  productId: number;
  review: string;
  reviewer: string;
  reviewerEmail: string;
  rating: number;
  reviewTitle: string;
}) {
  const res = await fetch(wcUrl('products/reviews'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      review,
      reviewer,
      reviewer_email: reviewerEmail,
      rating,
      review_title: reviewTitle,
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

/* -----------------------------
   BEST SELLERS / PRODUCTS
------------------------------*/
export async function getBestSellers() {
  const res = await fetch(
    wcUrl('products', { status: 'publish', per_page: 20 }),
    { next: { revalidate: 300 } },
  );

  return res.json();
}

/* -----------------------------
   CATEGORIES
------------------------------*/
// export async function getCategories() {
//   const res = await fetch(wcUrl('products/categories', { per_page: 20 }), {
//     next: { revalidate: 300 },
//   });

//   return res.json();
// }

export async function getCategories() {
  const res = await fetch(wcUrl('products/categories', { per_page: 20 }), {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('WooCommerce Category Fetch Failed:', errorText);
    return []; // Return safe empty array instead of crashing your app
  }

  return res.json();
}

/* -----------------------------
   PRODUCT BY SLUG
------------------------------*/
export async function getProductBySlug(slug: string) {
  const res = await fetch(wcUrl('products', { slug }), {
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;

  const products = await res.json();
  return Array.isArray(products) ? products[0] : products;
}

/* -----------------------------
   REVIEWS
------------------------------*/
export async function getProductReviews(productId: number, isHome: boolean) {
  const endpoint = isHome
    ? wcUrl('products/reviews')
    : wcUrl('products/reviews', { product: productId });

  const res = await fetch(endpoint, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch reviews');

  return res.json();
}

/* -----------------------------
   SEARCH PRODUCTS
------------------------------*/
export async function searchProducts(query: string, perPage = 6) {
  const res = await fetch(
    wcUrl('products', {
      search: encodeURIComponent(query),
      per_page: perPage,
      status: 'publish',
    }),
    { cache: 'no-store' },
  );

  if (!res.ok) throw new Error('Failed to search products');

  return res.json() as Promise<WooProduct[]>;
}

/* -----------------------------
   ALL PRODUCTS (FILTERS)
------------------------------*/
export async function getAllProducts(params?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  perPage?: number;
}) {
  const query: Record<string, string | number> = {
    status: 'publish',
    per_page: params?.perPage ?? 20,
  };

  if (params?.search) query.search = params.search;
  if (params?.category) query.category = params.category;
  if (params?.minPrice !== undefined) query.min_price = params.minPrice;
  if (params?.maxPrice !== undefined) query.max_price = params.maxPrice;

  const res = await fetch(wcUrl('products', query), {
    ...(params?.search || params?.category
      ? { cache: 'no-store' }
      : { next: { revalidate: 300 } }),
  });

  if (!res.ok) return [];

  return res.json();
}

/* -----------------------------
   PAGES (WP REST - NO AUTH NEEDED)
------------------------------*/
export async function getPages() {
  const res = await fetch(`${BASE_URL}/wp-json/wp/v2/pages?per_page=100`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status}`);

  return res.json();
}
