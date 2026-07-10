import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get('order_id');
    const key = req.nextUrl.searchParams.get('key');

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/headless/v1/order-status?order_id=${orderId}&key=${key}`,
        {
            headers: {
                'x-headless-secret':
                    process.env.HEADLESS_SHARED_SECRET || '',
            },
        },
    );

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}