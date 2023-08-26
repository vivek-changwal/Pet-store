const router = require('express').Router();
const address = require('../controllers/addresses.controller');

module.exports = (app) => {
  router.post('/', address.create);
  router.get('/:id', address.show);
  router.put('/:id', address.update);
  router.delete('/:id', address.delete);
  app.use('/api/addresses', router);
};
