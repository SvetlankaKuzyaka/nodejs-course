const User = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskRepo = require('../tasks/task.DB.repository');

const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const create = async user => User.create(user);

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  await taskRepo.updateAllByUser(id);
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, remove };
