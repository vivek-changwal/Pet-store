const router = require('express').Router();
const products = require('../../controllers/admin/products.controller');

module.exports = (app) => {
  router.post('/', products.create);
  router.get('/', products.filter);
  router.get('/:id', products.show);
  router.put('/:id', products.update);
  router.delete('/:id', products.delete);
  app.use('/api/admin/products', router);
};
