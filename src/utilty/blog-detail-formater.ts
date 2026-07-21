import { getauthorbyId } from '../lib/blog';

export const formatBlogDetail = async (blog: any) => {
  let authorData = null;
  try {
    authorData = await getauthorbyId(blog.author);
  } catch (e) {
    console.error('Failed to fetch author', e);
  }

  const authorImage =
    authorData?.avatar_urls?.['96'] ||
    authorData?.avatar_urls?.['48'] ||
    '/blog/blog-avatar.jpg';

  const authorName = authorData?.name || 'Restful Blanket';

  return {
    hero: {
      category: 'BLOG',
      title: blog.title?.rendered || '',
      description: blog.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
      author: authorName,
      authorImage,
      date: new Date(blog.date).toLocaleDateString('en-US'),
      views: '',
      image: blog.jetpack_featured_media_url,
    },
    content: blog.content?.rendered || '',
  };
};
