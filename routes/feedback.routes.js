const router = require('express').Router();
const feedback = require('../controllers/feedbacks.controller');

module.exports = (app) => {
  router.post('/', feedback.create);
  router.get('/:id', feedback.show);
  router.put('/:id', feedback.update);
  router.delete('/:id', feedback.delete);
  router.get('/:id/filter', feedback.filter);
  app.use('/api/feedbacks', router);
};
