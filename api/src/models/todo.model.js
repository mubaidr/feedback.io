// todo-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = app => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const todo = new Schema(
    {
      text: { type: String, required: true },
      done: { type: String, required: false, default: false }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('todo', todo);
};
