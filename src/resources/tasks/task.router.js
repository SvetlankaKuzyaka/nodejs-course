const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.status(OK).json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.taskId);
  res.status(OK).send(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(req.params.boardId, req.body);
  res.status(OK).send(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.status(OK).send(Task.toResponse(task));
});

router.route('/:taskId').delete(async (req, res) => {
  await taskService.remove(req.params.boardId, req.params.taskId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
