const router = require('express').Router();
const Message = require('../controllers/messages.controller');

module.exports = (app) => {
  router.post('/', Message.create);
  router.get('/:id', Message.index);
  router.delete('/:id', Message.delete);
  app.use('/api/messages', router);
};
