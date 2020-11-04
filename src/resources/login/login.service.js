const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { FORBIDDEN_ERROR } = require('../../errors/appError');
const { validatePassword } = require('../../common/hashHelpers');

const signToken = async (userLogin, userPassword) => {
  const { id, login, password: hashedPassword } = await userService.getByLogin(
    userLogin
  );
  const compareRes = await validatePassword(userPassword, hashedPassword);
  if (!compareRes) {
    throw new FORBIDDEN_ERROR();
  }
  return jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { signToken };
