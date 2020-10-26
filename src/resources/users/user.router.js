const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.status(OK).json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await userService.get(req.params.userId);
  res.status(OK).send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(OK).send(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  res.status(OK).send(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  await userService.remove(req.params.userId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
