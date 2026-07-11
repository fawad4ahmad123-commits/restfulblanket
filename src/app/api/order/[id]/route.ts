import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id: orderId } = await context.params;

    const { searchParams } = new URL(req.url);

    const key = searchParams.get('key');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.WC_KEY}:${process.env.WC_SECRET}`,
            ).toString('base64'),
        },
        cache: 'no-store',
      },
    );

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: 'Order not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
