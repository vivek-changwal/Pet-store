const router = require('express').Router();
const order = require('../controllers/orders.controller');

module.exports = (app) => {
  router.post('/', order.create);
  router.get('/', order.filter);
  router.get('/:id', order.show);
  router.put('/:id', order.update);
  router.delete('/:id', order.delete);
  app.use('/api/orders', router);
};
