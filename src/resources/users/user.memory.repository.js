const { userDB } = require('../../common/databaseMock');

const getAll = async () => {
  return Object.keys(userDB).map(id => userDB[id]);
};

const get = async id => {
  return userDB[id];
};

const create = async user => {
  userDB[user.id] = user;
  return get(user.id);
};

const update = async (id, user) => {
  userDB[id] = { ...userDB[id], ...user };
  return get(id);
};

const remove = async id => {
  const user = get(id);
  delete userDB.id;
  return user;
};

module.exports = { getAll, get, create, update, remove };
