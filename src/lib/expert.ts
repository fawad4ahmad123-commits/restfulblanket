'use server';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL!;

// async function safeJsonFetch(url: string, options?: RequestInit) {
//   let res: Response;

//   try {
//     res = await fetch(url, options);
//   } catch (err) {
//     console.error(
//       'Network error fetching:',
//       url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
//       err,
//     );
//     return null;
//   }

//   const contentType = res.headers.get('content-type') || '';

//   if (!res.ok || !contentType.includes('application/json')) {
//     let bodyText = '';

//     try {
//       bodyText = await res.text();
//     } catch {}

//     console.error(
//       'WooCommerce/WP fetch failed:',
//       url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
//       '\nStatus:',
//       res.status,
//       '\nContent-Type:',
//       contentType,
//       '\nBody (first 300 chars):',
//       bodyText.slice(0, 300),
//     );

//     return null;
//   }

//   try {
//     return await res.json();
//   } catch (err) {
//     console.error(
//       'Failed to parse JSON from:',
//       url.replace(/consumer_secret=[^&]+/, 'consumer_secret=HIDDEN'),
//       err,
//     );

//     return null;
//   }
// }

export async function getExperts(slug: string) {
  console.log('t1 Expert slug:', slug);

  const response = await fetch(
    `https://tapbookme.com/wp-json/wp/v2/pages?slug=${slug}`,
    // `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch expert');
  }

  const data = await response.json();
  return data;
}
