const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(OK).json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardService.get(req.params.boardId);
  res.status(OK).send(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);
  res.status(OK).send(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(req.params.boardId, req.body);
  res.status(OK).send(Board.toResponse(board));
});

router.route('/:boardId').delete(async (req, res) => {
  await boardService.remove(req.params.boardId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
