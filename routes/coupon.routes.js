const router = require('express').Router();
const coupon = require('../controllers/coupons.controller');

module.exports = (app) => {
  router.post('/', coupon.create);
  router.get('/:id', coupon.show);
  router.put('/:id', coupon.update);
  router.delete('/:id', coupon.delete);
  app.use('/api/coupons', router);
};
