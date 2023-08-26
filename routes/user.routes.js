const router = require('express').Router();
const user = require('../controllers/users.controller');
const { verifyToken } = require('../policy/auth.policy');

module.exports = (app) => {
  router.post('/', user.create);
  router.get('/filter_index?', user.filter);
  router.get('/:id', verifyToken, user.show);
  router.put('/:id', verifyToken, user.update);
  router.delete('/:id', verifyToken, user.delete);
  app.use('/api/users', router);
};
