const router = require('express').Router();
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.json(task);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.create(req.params.boardId, req.body);
  res.json(task);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const task = await taskService.remove(req.params.boardId, req.params.taskId);
  res.json(task);
});

module.exports = router;
