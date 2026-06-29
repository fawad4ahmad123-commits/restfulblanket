export const formatBlogDetail = (blog: any) => {
  return {
    hero: {
      category: 'BLOG',
      title: blog.title?.rendered || '',
      description: blog.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
      author: 'Restful Blanket',
      authorImage: '/blog/blog-avatar.jpg',
      date: new Date(blog.date).toLocaleDateString('en-US'),
      views: '10k Viewers',
      image: blog.jetpack_featured_media_url,
    },

    content: blog.content?.rendered || '',
  };
};
