const mongoose = require('mongoose');

const Task = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  {
    collection: 'tasks',
    versionKey: false
  }
);

module.exports = mongoose.model('tasks', Task);
