import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Discount code is required' },
        { status: 400 },
      );
    }

    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    if (!wordpressUrl) {
      return NextResponse.json(
        { error: 'WordPress URL is missing' },
        { status: 500 },
      );
    }

    // const response = await fetch(
    //   `${wordpressUrl}/wp-json/custom/v1/apply-coupon`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ code }),
    //   },
    // );
    const response = await fetch(
      `${wordpressUrl}/wp-json/jetpack/v4/site/discount`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || 'Invalid discount code',
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Discount API Error:', error);

    return NextResponse.json(
      {
        error: 'Could not apply discount code',
      },
      { status: 500 },
    );
  }
}
