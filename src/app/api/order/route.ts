import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json({ message: 'Missing order_id' }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${orderId}`,
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
          ).toString('base64'),
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
