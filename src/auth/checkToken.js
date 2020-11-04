const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED_ERROR } = require('../errors/appError');

module.exports = (req, res, next) => {
  const tokenString = req.header('Authorization');
  if (!tokenString) {
    throw new UNAUTHORIZED_ERROR();
  }
  const [type, token] = tokenString.split(' ');
  if (type !== 'Bearer') {
    throw new UNAUTHORIZED_ERROR();
  }
  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch {
    throw new UNAUTHORIZED_ERROR();
  }
  return next();
};
