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

Task.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = mongoose.model('tasks', Task);
