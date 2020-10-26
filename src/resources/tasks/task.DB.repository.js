const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');

const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ boardId, _id: taskId });
  if (!task) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  return task;
};

const getAllByUser = async userId => Task.find({ userId });

const create = async (boardId, task) => Task.create({ ...task, boardId });

const update = async (boardId, taskId, task) => {
  await Task.updateOne({ _id: taskId, boardId }, task);
  return get(boardId, taskId);
};

const remove = async (boardId, taskId) =>
  Task.deleteOne({ boardId, _id: taskId });

module.exports = { getAll, get, getAllByUser, create, update, remove };
