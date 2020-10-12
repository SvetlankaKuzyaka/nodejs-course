const Board = require('./board.model');
const columnRepo = require('../columns/column.memory.repository');
const { boardDB } = require('../../common/databaseMock');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  return Object.keys(boardDB).map(id => boardDB[id]);
};

const get = async id => {
  const board = boardDB[id];
  if (board) return board;

  throw new Error(`The board with id=${id} was not found`);
};

const create = async body => {
  const board = new Board(body);
  const columns = board.columns.map(column => columnRepo.create(column));
  boardDB[board.id] = { ...board, columns };
  return get(board.id);
};

const update = async (id, board) => {
  boardDB[id] = { ...boardDB[id], ...board };
  return get(id);
};

const remove = async id => {
  const board = get(id);
  const tasks = await taskRepo.getAll(id);
  tasks.forEach(({ id: taskId, boardId }) => taskRepo.remove(boardId, taskId));
  delete boardDB[id];
  return board;
};

module.exports = { getAll, get, create, update, remove };
