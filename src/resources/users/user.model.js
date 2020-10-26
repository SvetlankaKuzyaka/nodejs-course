const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    collection: 'users',
    versionKey: false
  }
);

User.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = mongoose.model('users', User);
