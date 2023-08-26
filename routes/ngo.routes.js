const router = require('express').Router();
const ngo = require('../controllers/ngos.controller');

module.exports = (app) => {
  router.post('/', ngo.create);
  router.get('/filter_index?', ngo.filter_index);
  router.get('/:id', ngo.show);
  router.put('/:id', ngo.update);
  router.delete('/:id', ngo.delete);
  app.use('/api/ngos', router);
};
