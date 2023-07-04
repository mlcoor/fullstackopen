const dummy = blogs => 1;

const totalLikes = blogs =>
  blogs.length === 0 ? 0 : blogs.reduce((sum, cur) => sum + cur.likes, 0);

const favriteBlog = blogs => {
  if (blogs.length === 0) return null;

  const favriteBlog = blogs.reduce((favriteBlog, curblog) =>
    favriteBlog.likes >= curblog.likes ? favriteBlog : curblog,
  );

  return {
    title: favriteBlog.title,
    author: favriteBlog.author,
    likes: favriteBlog.likes,
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return null;

  const blogCounts = {};
  const mostBlogs = {
    author: '',
    blogs: 0,
  };

  blogs.forEach(blog => {
    blogCounts[blog.author] = blogCounts[blog.author]
      ? blogCounts[blog.author] + 1
      : 1;
  });

  for (const [author, blogNumber] of Object.entries(blogCounts)) {
    if (blogNumber > mostBlogs.blogs) {
      mostBlogs.author = author;
      mostBlogs.blogs = blogNumber;
    }
  }

  return mostBlogs;
};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const blogLikes = {};
  const mostLikes = {
    author: '',
    likes: 0,
  };

  blogs.forEach(blog => {
    blogLikes[blog.author] = blogLikes[blog.author]
      ? blogLikes[blog.author] + blog.likes
      : blog.likes;
  });

  for (const [author, like] of Object.entries(blogLikes)) {
    if (like > mostLikes.likes) {
      mostLikes.author = author;
      mostLikes.likes = like;
    }
  }
  return mostLikes;
};

export default { dummy, totalLikes, favriteBlog, mostBlogs, mostLikes };
