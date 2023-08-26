const show = async (blog) => {
  const blogDetails = {
    id: blog.id,
    user_id: blog.user_id,
    title: blog.title,
    post_image: blog.post_image,
    description: blog.description,
    comment: blog.comment,
    user: {
      fullname: blog.user.first_name.concat(`${blog.user.last_name}`),
    },
  };
  return blogDetails;
};

const index = async (blogs) => {
  const blogsList = [];
  Array.from(blogs.rows).forEach((blog) => {
    const user = {
      id: blog.id,
      title: blog.title,
      post_image: blog.post_image,
      description: blog.description,
      comment: blog.comment,
      user: {
        fullname: blog.user.first_name.concat(` ${blog.user.last_name}`),
      },
    };
    blogsList.push(user);
  });
  return blogsList;
};

module.exports = {
  show, index,
};

