export async function getRankMathSEO() {
  const response = await fetch(
    "https://tapbookme.com/wp-json/nextjs/v1/seo-by-slug/home",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  console.log("SEO DATA", data);

  return data;
}