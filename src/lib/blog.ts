export async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=100`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const data = await res.json();
  console.log('taha blog aaa', { data });

  return data;
}

export async function getBlogBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch blog');
  }

  const data = await res.json();
  return data[0];
}

export async function getauthorbyId(id: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/users/${id}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch author');
  }

  return res.json();
}
