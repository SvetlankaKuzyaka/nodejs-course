const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.boardId);
    res.json(board);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);
  res.json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(req.params.boardId, req.body);
  res.json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardService.remove(req.params.boardId);
  res.json(board);
});

module.exports = router;
