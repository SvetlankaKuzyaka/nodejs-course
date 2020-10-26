const Board = require('./board.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskRepo = require('../tasks/task.DB.repository');

const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  await taskRepo.removeAllByBoard(id);
  return Board.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, remove };
