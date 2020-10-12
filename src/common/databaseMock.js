const User = require('../resources/users/user.model');

const userDB = Array.from({ length: 5 }, () => new User()).reduce(
  (acc, user) => {
    Object.assign(acc, { [user.id]: user });
    return acc;
  },
  {}
);

module.exports = {
  userDB
};
