const { Schema, model } = require('mongoose');

const user = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = model('user', user);
