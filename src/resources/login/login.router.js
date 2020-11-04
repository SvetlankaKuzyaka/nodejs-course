const { OK } = require('http-status-codes');
const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.signToken(login, password);
  res.status(OK).json({ token });
});

module.exports = router;
