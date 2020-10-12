const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await userService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = await userService.create(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await userService.remove(req.params.id);
  res.json(User.toResponse(user));
});

module.exports = router;
