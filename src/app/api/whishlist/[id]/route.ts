import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        const token = req.headers.get('authorization');

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/headless/v1/wishlist/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: token || '',
                },
            },
        );

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to remove wishlist item',
            },
            { status: 500 },
        );
    }
}