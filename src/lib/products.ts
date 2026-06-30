import { WooProduct } from './types';

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/reviews`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      body: JSON.stringify({
        product_id: productId,
        review,
        reviewer,
        reviewer_email: reviewerEmail,
        rating,
        review_title: reviewTitle,
      }),
    },
  );

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error('Failed to submit product review');
  }

  return res.json();
}

export async function getBestSellers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?status=publish&per_page=20`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      next: {
        revalidate: 3600,
      },
    },
  );
  return res.json();
}

export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/categories?status=publish&per_page=20`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json();
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?slug=${slug}`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    console.error('Failed to fetch product', slug, res.status);
    return null;
  }

  const products = await res.json();
  const product = Array.isArray(products) ? products[0] : products;
  return product ?? null;
}

export async function getProductReviews(productId: number, isHome: boolean) {
  const endpoint = isHome
    ? `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/reviews`
    : `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/reviews?product=${productId}`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
        ).toString('base64'),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch reviews');
  }

  return res.json();
}

export async function searchProducts(query: string, perPage = 6) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?search=${encodeURIComponent(
      query,
    )}&per_page=${perPage}&status=publish`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to search products');
  }

  return res.json() as Promise<WooProduct[]>;
}

export async function getAllProducts(params?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  perPage?: number;
}) {
  const query = new URLSearchParams();

  query.set('status', 'publish');
  query.set('per_page', String(params?.perPage ?? 20));

  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  if (params?.minPrice !== undefined)
    query.set('min_price', String(params.minPrice));
  if (params?.maxPrice !== undefined)
    query.set('max_price', String(params.maxPrice));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?${query.toString()}`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
      // no-store when search/filters are present so results aren't cached/stale,
      // otherwise use revalidate for the default listing
      ...(params?.search || params?.category
        ? { cache: 'no-store' as const }
        : { next: { revalidate: 3600 } }),
    },
  );

  if (!res.ok) {
    console.error('Failed to fetch products', res.status);
    return [];
  }

  return res.json();
}

export async function getPages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages?per_page=100`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch pages: ${res.status}`);
  }

  return res.json();
}
