const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');

const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ boardId, _id: taskId });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id: taskId, boardId });
  }
  return task;
};

const create = async (boardId, task) => Task.create({ ...task, boardId });

const update = async (boardId, taskId, task) => {
  await Task.updateOne({ _id: taskId, boardId }, task);
  return get(boardId, taskId);
};

const updateAllByUser = async userId =>
  Task.updateMany({ userId }, { userId: null });

const remove = async (boardId, taskId) =>
  Task.deleteOne({ _id: taskId, boardId });

const removeAllByBoard = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getAll,
  get,
  create,
  update,
  updateAllByUser,
  remove,
  removeAllByBoard
};
