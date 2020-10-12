const Task = require('./task.model');
const { taskDB } = require('../../common/databaseMock');

const getAll = async boardId => {
  return Object.keys(taskDB)
    .filter(id => taskDB[id].boardId === boardId)
    .map(id => taskDB[id]);
};

const get = async (boardId, taskId) => {
  const task = taskDB[taskId].boardId === boardId && taskDB[taskId];
  if (task) return task;

  throw new Error(
    `The task with taskId=${taskId} and boardId=${boardId} was not found`
  );
};

const getAllByUser = async userId => {
  return Object.keys(taskDB)
    .filter(id => taskDB[id].userId === userId)
    .map(id => taskDB[id]);
};

const create = async (boardId, body) => {
  const task = new Task({ ...body, boardId });
  taskDB[task.id] = task;
  return get(boardId, task.id);
};

const update = async (boardId, taskId, task) => {
  if (taskDB[taskId].boardId === boardId) {
    taskDB[taskId] = {
      ...taskDB[taskId],
      ...task
    };
  }
  return get(boardId, taskId);
};

const remove = async (boardId, taskId) => {
  const task = get(boardId, taskId);
  delete taskDB[taskId];
  return task;
};

module.exports = { getAll, get, getAllByUser, create, update, remove };
