const userRepo = require('./user.DB.repository');
const { hashPassword } = require('../../common/hashHelpers');

const getAll = () => userRepo.getAll();

const get = id => userRepo.get(id);

const getByLogin = login => userRepo.getByLogin(login);

const create = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  return userRepo.create({ ...user, password: hashedPassword });
};

const update = (id, user) => userRepo.update(id, user);

const remove = id => userRepo.remove(id);

module.exports = { getAll, get, getByLogin, create, update, remove };
