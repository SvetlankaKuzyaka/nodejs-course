const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await userService.get(req.params.userId);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = await userService.create(req.body);
  res.json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  res.json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  const user = await userService.remove(req.params.userId);
  res.json(User.toResponse(user));
});

module.exports = router;
