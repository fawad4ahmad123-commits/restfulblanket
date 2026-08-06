import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    return new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error(error);

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
