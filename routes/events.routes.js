const router = require('express').Router();
const event = require('../controllers/events.controller');

module.exports = (app) => {
  router.post('/', event.create);
  router.get('/filter_index?', event.filter_index);
  router.get('/:id', event.show);
  router.put('/:id', event.update);
  router.delete('/:id', event.delete);
  app.use('/api/events', router);
};
