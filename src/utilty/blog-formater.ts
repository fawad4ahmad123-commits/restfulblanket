export const formatBlogs = (blogs: any[]) => {
  return blogs.map((blog, index) => ({
    id: blog.id,
    slug: blog.slug,
    image: blog.jetpack_featured_media_url || '/placeholder-image.png',
    author: 'Restful Blanket',
    authorImage: `https://i.pravatar.cc/100?img=${(index % 70) + 1}`,

    title: blog.title?.rendered || '',

    excerpt:
      blog.excerpt?.rendered
        ?.replace(/<[^>]*>/g, '')
        ?.replace(/&nbsp;/g, ' ')
        ?.trim() || '',

    date: new Date(blog.date).toLocaleDateString('en-US'),
    views: '10k Viewers',
  }));
};
