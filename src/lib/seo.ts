export async function getRankMathSEO(url: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(url)}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      console.log('RankMath SEO fetch failed:', response.status, url);
      return null;
    }

    const data = await response.json();

    if (process.env.NODE_ENV !== 'production') {
      console.log('RankMath head for', url, '→', data?.head);
    }

    return data;
  } catch (error) {
    console.log('RankMath SEO error:', error);
    return null;
  }
}