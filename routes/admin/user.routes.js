const router = require('express').Router();
const { verifyToken } = require('../../policy/auth.policy');
const user = require('../../controllers/admin/users.controller');

module.exports = (app) => {
  router.post('/', user.create);
  router.get('/', user.filter);
  router.get('/:id', verifyToken, user.show);
  router.put('/:id', user.update);
  router.delete('/:id', verifyToken, user.delete);
  app.use('/api/admin/users', router);
};
