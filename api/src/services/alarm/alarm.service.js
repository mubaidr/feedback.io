// Initializes the `alarm` service on path `/alarm`
const createService = require('feathers-mongoose');
const createModel = require('../../models/alarm.model');
const hooks = require('./alarm.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/alarm', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('alarm');

  service.hooks(hooks);
};
