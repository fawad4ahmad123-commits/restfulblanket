import { getauthorbyId } from '../lib/blog';

export const formatBlogs = async (blogs: any[]) => {
  return Promise.all(
    blogs.map(async (blog) => {
      const authorData = await getauthorbyId(blog.author);
      return {
        id: blog.id,
        slug: blog.slug,

        image: blog.jetpack_featured_media_url || '/placeholder-image.png',

        author: authorData?.name || 'Restful Blanket',

        authorImage:
          authorData?.avatar_urls?.['96'] ||
          authorData?.avatar_urls?.['48'] ||
          '/placeholder-avatar.png',

        title: blog.title?.rendered || '',

        excerpt:
          blog.excerpt?.rendered
            ?.replace(/<[^>]*>/g, '')
            ?.replace(/&nbsp;/g, ' ')
            ?.trim() || '',

        date: new Date(blog.date).toLocaleDateString('en-US'),
      };
    }),
  );
};
