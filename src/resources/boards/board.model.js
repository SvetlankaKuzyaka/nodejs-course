const mongoose = require('mongoose');

const Board = new mongoose.Schema(
  {
    title: String,
    columns: Object
  },
  {
    collection: 'boards',
    versionKey: false
  }
);

Board.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = mongoose.model('boards', Board);
