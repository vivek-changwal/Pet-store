const JWT = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Token missing');
  }
  const authHeader = req.headers.authorization.split(' ')[1];
  JWT.verify(authHeader, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({
        message: 'Invalid token',
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  });
  return '';
};

module.exports = {
  verifyToken,
};
