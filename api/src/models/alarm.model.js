// alarm-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const alarm = new Schema(
    {
      text: { type: String, required: true },
      time: {
        type: Date,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('alarm', alarm);
};
