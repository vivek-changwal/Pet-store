const router = require('express').Router();
const cartItem = require('../controllers/cart_items.controller');

module.exports = (app) => {
  router.post('/', cartItem.create);
  router.get('/', cartItem.filter);
  router.get('/:id', cartItem.show);
  router.put('/:id', cartItem.update);
  router.delete('/:id', cartItem.delete);
  app.use('/api/cartItems', router);
};
