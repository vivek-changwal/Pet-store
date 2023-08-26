const router = require('express').Router();
const veterinary = require('../controllers/veterinaries.controller');

module.exports = (app) => {
  router.post('/', veterinary.create);
  router.get('/filter_index?', veterinary.filter);
  router.get('/:id', veterinary.show);
  router.put('/:id', veterinary.update);
  router.delete('/:id', veterinary.delete);
  app.use('/api/veterinaries', router);
};
