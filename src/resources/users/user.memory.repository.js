const User = require('./user.model');
const { userDB } = require('../../common/databaseMock');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  return Object.keys(userDB).map(id => userDB[id]);
};

const get = async id => {
  const user = userDB[id];
  if (user) return user;

  throw new Error(`The user with id=${id} was not found`);
};

const create = async body => {
  const user = new User(body);
  userDB[user.id] = user;
  return get(user.id);
};

const update = async (id, user) => {
  userDB[id] = { ...userDB[id], ...user };
  return get(id);
};

const remove = async id => {
  const user = get(id);
  const tasks = await taskRepo.getAllByUser(id);
  tasks.forEach(({ id: taskId, boardId }) =>
    taskRepo.update(boardId, taskId, { userId: null })
  );
  delete userDB[id];
  return user;
};

module.exports = { getAll, get, create, update, remove };
