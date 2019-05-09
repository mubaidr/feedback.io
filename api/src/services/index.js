const todo = require('./todo/todo.service.js');
const alarm = require('./alarm/alarm.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = app => {
  app.configure(alarm);
  app.configure(todo);
};
