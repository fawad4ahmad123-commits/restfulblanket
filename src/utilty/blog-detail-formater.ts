export const formatBlogDetail = (blog: any) => {
  const embeddedAuthor = blog?._embedded?.author?.[0];

  const authorImage =
    embeddedAuthor?.avatar_urls?.['96'] ||
    embeddedAuthor?.avatar_urls?.['48'] ||
    blog?.author_avatar ||
    blog?.author_image ||
    '/blog/blog-avatar.jpg';

  const authorName =
    embeddedAuthor?.name || blog.author_name || 'Restful Blanket';

  return {
    hero: {
      category: 'BLOG',
      title: blog.title?.rendered || '',
      description: blog.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
      author: authorName,
      authorImage,
      date: new Date(blog.date).toLocaleDateString('en-US'),
      views: '10k Viewers',
      image: blog.jetpack_featured_media_url,
    },
    content: blog.content?.rendered || '',
  };
};
