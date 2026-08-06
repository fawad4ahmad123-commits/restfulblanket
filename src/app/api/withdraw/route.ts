import { NextRequest, NextResponse } from 'next/server';

const WITHDRAWAL_STATUS = 'withdrawal-requested';

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderKey, cancelFullOrder, lineItems, reason } =
      await req.json();

    if (!orderId || !orderKey) {
      return NextResponse.json(
        { success: false, message: 'Manglende ordreoplysninger.' },
        { status: 400 },
      );
    }

    const auth = Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
    ).toString('base64');

    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
      },
    );

    if (!orderRes.ok) {
      return NextResponse.json(
        { success: false, message: 'Ordren kunne ikke findes.' },
        { status: 404 },
      );
    }

    const order = await orderRes.json();

    if (order.order_key !== orderKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid order key' },
        { status: 403 },
      );
    }

    const noteLines = [
      'Kunden har anmodet om fortrydelse via fortrydelsesformularen.',
      cancelFullOrder
        ? 'Anmodningen dækker HELE ordren.'
        : 'Anmodningen dækker følgende varer:',
    ];

    if (!cancelFullOrder && Array.isArray(lineItems)) {
      for (const item of lineItems) {
        noteLines.push(
          `- Vare-ID ${item.id} (produkt ${item.productId}): antal ${item.quantity}`,
        );
      }
    }

    if (reason) {
      noteLines.push(`Begrundelse: ${reason}`);
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}/notes`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: noteLines.join('\n'),
          customer_note: false,
        }),
      },
    );

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: WITHDRAWAL_STATUS,
          meta_data: [
            {
              key: '_withdrawal_cancel_full_order',
              value: cancelFullOrder ? 'yes' : 'no',
            },
            {
              key: '_withdrawal_line_items',
              value: JSON.stringify(lineItems || []),
            },
          ],
        }),
      },
    );

    if (!updateRes.ok) {
      const err = await updateRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          message: err?.message || 'Statusopdatering fejlede.',
        },
        { status: 502 },
      );
    }

    const updatedOrder = await updateRes.json();

    return NextResponse.json({
      success: true,
      message:
        'Din fortrydelsesanmodning er blevet sendt. Du vil modtage en bekræftelsesmail hurtigst muligt.',
      order: updatedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Der opstod en serverfejl.' },
      { status: 500 },
    );
  }
}
