import { NextResponse } from 'next/server';
import { getCategories } from '@/src/lib/products';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return NextResponse.json(
      { categories: [], error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}
