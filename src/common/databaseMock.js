const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/columns/column.model');
const Task = require('../resources/tasks/task.model');

const users = Array.from({ length: 5 }, () => new User());
const userDB = users.reduce((acc, user) => {
  Object.assign(acc, { [user.id]: user });
  return acc;
}, {});

const boards = Array.from(
  { length: 5 },
  () =>
    new Board({
      columns: Array.from({ length: 3 }, (_, i) => new Column({ order: i }))
    })
);
const boardDB = boards.reduce((acc, board) => {
  Object.assign(acc, { [board.id]: board });
  return acc;
}, {});

const taskDB = Array.from(
  { length: 5 },
  (_, i) => new Task({ order: i, userId: users[i].id, boardId: boards[i].id })
).reduce((acc, task) => {
  Object.assign(acc, { [task.id]: task });
  return acc;
}, {});

module.exports = {
  userDB,
  boardDB,
  taskDB
};
