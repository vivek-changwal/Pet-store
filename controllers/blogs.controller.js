const { Op } = require('sequelize');
const db = require('../models/index');
const serialize = require('../serializers/blog.serializer');
const { getPagination, getPagingData } = require('../utilities/pagination');

const { Blog, User } = db;

exports.create = async (req, res) => {
  const blogDetails = await Blog.create(req.body).then((newBlog) => {
    const blog = Blog.findOne({
      where: {
        id: newBlog.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return blog;
  });
  const responseData = await serialize.show(blogDetails);
  res.status(201).send({
    blog: responseData,
    message: 'blog created',
  });
};

exports.show = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(blog);
    res.status(200).send({
      blog: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'blog data not found',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    blog.update(req.body).then(() => {
      serialize.show(blog).then((responseData) => {
        res.status(202).send({
          blog: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'blog deleted',
      });
    } else {
      res.status(404).send({
        message: 'blog not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter_index = async (req, res) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const blogs = await Blog.findAndCountAll({
      where: title ? {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      } : {},
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      limit,
      offset,
    });
    const responseData = await serialize.index(blogs);
    const pagingData = getPagingData(blogs, page, limit);
    res.status(200).send({
      blogs: responseData,
      pagingData,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

