const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');
const errorHandler = require('./errors/errorHandler');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', (req, res, next) => {
  logger.info(
    `method: ${req.method}, url: ${req.url}, query params: ${JSON.stringify(
      req.query
    )}, body: ${JSON.stringify(req.body)}`
  );
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

module.exports = app;
