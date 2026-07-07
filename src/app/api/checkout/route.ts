import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { shippingAddress, shippingMethod, paymentMethod, cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // ✅ Map UI payment methods → WooCommerce methods
    const paymentMethodMap: Record<string, string> = {
      credit: 'woocommerce_payments',
      mobile: 'woocommerce_payments',
      paypal: 'paypal',
      google: 'woocommerce_payments',
      apple: 'woocommerce_payments',
    };

    const line_items = cartItems.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const wcResponse = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
            ).toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method:
            paymentMethodMap[paymentMethod] || 'woocommerce_payments', // ✅ FIXED

          payment_method_title: 'WooPayments',
          set_paid: false,

          billing: {
            first_name: shippingAddress.name,
            email: shippingAddress.email,
            address_1: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postcode: shippingAddress.zip,
          },

          shipping: {
            first_name: shippingAddress.name,
            address_1: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postcode: shippingAddress.zip,
          },

          shipping_lines: [
            {
              method_id:
                shippingMethod === 'free' ? 'free_shipping' : 'flat_rate',
              method_title:
                shippingMethod === 'free'
                  ? 'Free Shipping'
                  : 'Standard Shipping',
              total: shippingMethod === 'free' ? '0.00' : '29.00',
            },
          ],

          line_items,
        }),
      },
    );

    const order = await wcResponse.json();

    if (!wcResponse.ok) {
      return NextResponse.json(
        { message: order.message || 'Failed to create order' },
        { status: wcResponse.status },
      );
    }

    const payment_url =
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout/order-pay/${order.id}/` +
      `?pay_for_order=true&key=${order.order_key}`;

    return NextResponse.json({
      order_id: order.id,
      payment_url,
    });
  } catch (err) {
    console.error('Checkout error:', err);

    return NextResponse.json(
      { message: 'Something went wrong while creating your order' },
      { status: 500 },
    );
  }
}
