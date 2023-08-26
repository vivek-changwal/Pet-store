const router = require('express').Router();
const cart = require('../controllers/carts.controller');

module.exports = (app) => {
  router.post('/', cart.create);
  router.get('/', cart.filter);
  router.get('/:id', cart.show);
  router.put('/:id', cart.update);
  router.delete('/:id', cart.delete);
  app.use('/api/carts', router);
};
