import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/src/lib/products';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
