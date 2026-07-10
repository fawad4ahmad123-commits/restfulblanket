import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('SENT TO WP:', body);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/headless/v1/create-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-headless-secret': process.env.HEADLESS_SHARED_SECRET || '',
        },
        body: JSON.stringify(body),
      },
    );

    const text = await response.text();

    console.log('WP STATUS:', response.status);
    console.log('WP RESPONSE:', text);

    return NextResponse.json(JSON.parse(text), {
      status: response.status,
    });
  } catch (error: any) {
    console.log('API ERROR:', error.message);

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
