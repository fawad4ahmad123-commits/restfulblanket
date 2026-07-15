import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/headless/v1/wishlist`,
      {
        headers: {
          Authorization: token || '',
        },
        cache: 'no-store',
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Wishlist GET Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch wishlist',
      },
      { status: 500 },
    );
  }
}
