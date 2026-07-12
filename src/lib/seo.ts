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
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('RankMath SEO error:', error);
    return null;
  }
}
