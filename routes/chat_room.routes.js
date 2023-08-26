const router = require('express').Router();
const chat = require('../controllers/chat_rooms.controller');

module.exports = (app) => {
  router.post('/', chat.create);
  router.get('/:id', chat.show);
  app.use('/api/chats', router);
};
