import Landing from '../components/Home';
import { getBestSellers, getCategories } from '@/src/lib/products';
import { getHomeBlogs } from '../lib/blog';
import { getRankMathSEO } from '@/src/lib/seo';
import { formatBlogs } from '../utilty/blog-formater';

export async function generateMetadata() {
  const data = await getRankMathSEO();

  const seo = data?.seo;
  console.log(" t12 SEO", seo);
  if (!seo) {
    return {};
  }

  return {
    title: seo.title,

    description: seo.description,

    alternates: {
      canonical: seo.canonical,
    },

    openGraph: {
      title:
        seo.openGraph?.title ||
        seo.title,

      description:
        seo.openGraph?.description ||
        seo.description,

      url:
        seo.openGraph?.url ||
        process.env.NEXT_PUBLIC_SITE_URL,

      images: seo.openGraph?.image
        ? [
          {
            url: seo.openGraph.image,
          },
        ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title:
        seo.twitter?.title ||
        seo.title,

      description:
        seo.twitter?.description ||
        seo.description,

      images: seo.twitter?.image
        ? [seo.twitter.image]
        : [],
    },
  };
}
export default async function Home() {
  const [products, categories, blog] = await Promise.all([
    getBestSellers(),
    getCategories(),
    getHomeBlogs(),
  ]);
  const blogs = await formatBlogs(blog);
  return (
    <Landing
      products={products}
      response_categories={categories}
      blogs={blogs}
    />
  );
}
