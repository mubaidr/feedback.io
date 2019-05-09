const { Schema, model } = require('mongoose');

const todo = new Schema(
  {
    name: {
      type: String
    },
    done: {
      type: Boolean
    }
  },
  {
    collection: 'todos'
  }
);

module.exports = model('Todo', todo);
