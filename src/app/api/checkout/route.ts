export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const auth = Buffer.from(
      `${process.env.WOOCOMMERCE_KEY}:${process.env.WOOCOMMERCE_SECRET}`,
    ).toString('base64');

    const orderRes = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/wc/v3/orders`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'pending',
          line_items: items.map(
            (item: {
              product_id: number;
              variation_id?: number;
              quantity: number;
            }) => ({
              product_id: item.product_id,
              ...(item.variation_id ? { variation_id: item.variation_id } : {}),
              quantity: item.quantity,
            }),
          ),
        }),
      },
    );

    if (!orderRes.ok) {
      const errData = await orderRes.json();
      return Response.json(
        { error: errData.message || 'Failed to create order' },
        { status: 500 },
      );
    }

    const order = await orderRes.json();

    const checkoutUrl = `${process.env.WORDPRESS_URL}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`;

    return Response.json({ checkoutUrl, orderId: order.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
