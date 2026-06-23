export async function getBestSellers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?status=publish&per_page=20`,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`,
          ).toString("base64"),
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json();
}
