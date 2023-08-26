const router = require('express').Router();
const productCategory = require('../controllers/product_categories.controller');

module.exports = (app) => {
  router.post('/', productCategory.create);
  router.get('/filter_index?', productCategory.filter_index);
  router.get('/:id', productCategory.show);
  router.put('/:id', productCategory.update);
  router.delete('/:id', productCategory.delete);
  app.use('/api/product-categories', router);
};
