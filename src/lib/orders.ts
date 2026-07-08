'use server';

export async function getUserOrders(customerId: number) {
  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders?customer=${customerId}`;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are not configured on the server.',
    );
  }

  const response = await fetch(url, {
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return response.json();
}
