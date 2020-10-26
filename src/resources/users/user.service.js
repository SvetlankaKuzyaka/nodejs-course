const userRepo = require('./user.DB.repository');

const getAll = () => userRepo.getAll();

const get = id => userRepo.get(id);

const create = user => userRepo.create(user);

const update = (id, user) => userRepo.update(id, user);

const remove = id => userRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
