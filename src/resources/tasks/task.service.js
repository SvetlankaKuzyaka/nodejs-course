const taskRepo = require('./task.DB.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.get(boardId, taskId);

const create = (boardId, task) => taskRepo.create(boardId, task);

const update = (boardId, taskId, task) =>
  taskRepo.update(boardId, taskId, task);

const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
