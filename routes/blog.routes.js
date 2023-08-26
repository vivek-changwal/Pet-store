const router = require('express').Router();
const blog = require('../controllers/blogs.controller');

module.exports = (app) => {
  router.post('/', blog.create);
  router.get('/filter_index?', blog.filter_index);
  router.get('/:id', blog.show);
  router.put('/:id', blog.update);
  router.delete('/:id', blog.delete);
  app.use('/api/blogs', router);
};
