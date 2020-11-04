const bcrypt = require('bcrypt');

const DEFAULT_SALT_ROUNDS = 10;

const hashPassword = async password => {
  const hash = await bcrypt.hash(password, DEFAULT_SALT_ROUNDS);
  return hash;
};

const validatePassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  validatePassword
};
