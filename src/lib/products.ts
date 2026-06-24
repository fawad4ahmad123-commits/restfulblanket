export async function createReview({
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
        reviewTitle,
      }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to submit review');
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

export async function getProductReviews(productId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/reviews?product=${productId}`,
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
    throw new Error('Failed to fetch reviews');
  }

  return res.json();
}
