'use server';
import { WooProduct } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL!;

const KEY = process.env.WC_CONSUMER_KEY!;
const SECRET = process.env.WC_CONSUMER_SECRET!;

function wcUrl(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}/wp-json/wc/v3/${path}`);

  url.searchParams.set('consumer_key', KEY);
  url.searchParams.set('consumer_secret', SECRET);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.set(k, String(v));
    });
  }
  console.log('t43 ', { url });
  return url.toString();
}

async function safeJsonFetch(url: string, options?: RequestInit) {
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (err) {
    console.error(
      'Network error fetching:',
      url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
      err,
    );
    return null;
  }

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok || !contentType.includes('application/json')) {
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch {
      // ignore
    }

    console.error(
      'WooCommerce/WP fetch failed:',
      url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
      '\nStatus:',
      res.status,
      '\nContent-Type:',
      contentType,
      '\nBody (first 300 chars):',
      bodyText.slice(0, 300),
    );
    return null;
  }

  try {
    return await res.json();
  } catch (err) {
    console.error(
      'Failed to parse JSON from:',
      url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
      err,
    );
    return null;
  }
}

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
  const data = await safeJsonFetch(wcUrl('products/reviews'), {
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

  if (data === null) {
    throw new Error('Failed to create product review');
  }

  return data;
}

export async function getBestSellers() {
  const data = await safeJsonFetch(
    wcUrl('products', { status: 'publish', per_page: 20 }),
    { next: { revalidate: 300 } },
  );

  return data ?? [];
}

export async function getCategories() {
  const data = await safeJsonFetch(
    wcUrl('products/categories', { per_page: 20 }),
    { next: { revalidate: 300 } },
  );

  return data ?? [];
}

// export async function getProductBySlug(slug: string) {
//   const data = await safeJsonFetch(wcUrl('products', { slug }), {
//     next: { revalidate: 300 },
//   });

//   if (data === null) return null;

//   return Array.isArray(data) ? data[0] : data;
// }
export async function getProductBySlug(slug: string) {
  const data = await safeJsonFetch(
    wcUrl('products', {
      slug,
      status: 'publish',
    }),
    {
      next: { revalidate: 300 },
    },
  );

  if (!data) return null;

  const product = Array.isArray(data) ? data[0] : data;

  if (!product) return null;

  if (product.type === 'variable') {
    const variations = await getProductVariations(product.id);

    product.variationData = variations;
  }

  return product;
}

export async function getProductReviews(productId: number, isHome: boolean) {
  const endpoint = isHome
    ? wcUrl('products/reviews')
    : wcUrl('products/reviews', { product: productId });

  const data = await safeJsonFetch(endpoint, { cache: 'no-store' });

  if (data === null) {
    throw new Error('Failed to fetch reviews');
  }

  return data;
}

export async function searchProducts(query: string, perPage = 6) {
  const data = await safeJsonFetch(
    wcUrl('products', {
      search: encodeURIComponent(query),
      per_page: perPage,
      status: 'publish',
    }),
    { cache: 'no-store' },
  );

  if (data === null) {
    throw new Error('Failed to search products');
  }

  return data as WooProduct[];
}

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

  const data = await safeJsonFetch(wcUrl('products', query), {
    ...(params?.search || params?.category
      ? { cache: 'no-store' }
      : { next: { revalidate: 300 } }),
  });

  return data ?? [];
}

export async function getPages() {
  const data = await safeJsonFetch(
    `${BASE_URL}/wp-json/wp/v2/pages?per_page=100`,
    { next: { revalidate: 300 } },
  );

  if (data === null) {
    throw new Error('Failed to fetch pages');
  }

  return data;
}

export async function getProductVariations(productId: number) {
  const data = await safeJsonFetch(
    wcUrl(`products/${productId}/variations`, {
      per_page: 100,
    }),
    {
      next: { revalidate: 300 },
    },
  );

  return data ?? [];
}

export async function getProductWithVariations(productId: number) {
  const product = await safeJsonFetch(wcUrl(`products/${productId}`), {
    next: { revalidate: 300 },
  });

  if (!product) return null;

  if (product.type === 'variable') {
    product.variationData = await getProductVariations(productId);
  }

  return product;
}
