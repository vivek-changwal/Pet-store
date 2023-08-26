const router = require('express').Router();
const product = require('../controllers/products.controller');

module.exports = (app) => {
  router.post('/', product.create);
  router.get('/filter_index?', product.filter_index);
  router.get('/:id', product.show);
  router.put('/:id', product.update);
  router.delete('/:id', product.delete);
  app.use('/api/products', router);
};
