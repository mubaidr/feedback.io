var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todo');
// Require configuration file defined in app/Config.js
var config = require('./config');

var port = config.APP_PORT || 4000;

// Connect to database
mongoose.connect(config.DB, {
  useNewUrlParser: true
});

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Pass to next layer of middleware
  next();
});

//  Use routes defined in Route.js
app.use('/api', todoRoutes);

// handle 404s
// eslint-disable-next-line
app.get(function(req, res, next) {
  res.sendStatus(404);
});

app.listen(port); // Listen on port defined in config file
console.log('App listening on port ' + port);
