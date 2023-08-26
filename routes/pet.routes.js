const router = require('express').Router();
const pet = require('../controllers/pets.controller');

module.exports = (app) => {
  router.post('/', pet.create);
  router.get('/filter_index?', pet.filter);
  router.get('/:id', pet.show);
  router.put('/:id', pet.update);
  router.delete('/:id', pet.delete);
  app.use('/api/pets', router);
};
