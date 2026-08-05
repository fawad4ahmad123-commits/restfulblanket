import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderKey, reason } = await req.json();

    const auth = Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
    ).toString('base64');

    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    const order = await orderRes.json();

    if (order.order_key !== orderKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid order key' },
        { status: 403 },
      );
    }

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'cancelled',
        }),
      },
    );

    const updatedOrder = await updateRes.json();

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
