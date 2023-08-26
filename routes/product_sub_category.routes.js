const router = require('express').Router();
const productSubCategory = require('../controllers/product_sub_categories.controller');

module.exports = (app) => {
  router.post('/', productSubCategory.create);
  router.get('/filter_index?', productSubCategory.filter_index);
  router.get('/:id', productSubCategory.show);
  router.put('/:id', productSubCategory.update);
  router.delete('/:id', productSubCategory.delete);
  app.use('/api/product-sub-categories', router);
};
