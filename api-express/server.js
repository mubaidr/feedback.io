const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
// Require configuration file defined in app/Config.js
const config = require('./config');

const port = config.APP_PORT || 4000;

// Connect to database
mongoose.connect(config.DB, {
  useNewUrlParser: true
});

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use('/api', (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

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
app.use(userRoutes);

app.use('/api', function(req, res, next) {
  if (!req.session.user) return res.sendStatus(401);

  next();
});
app.use('/api', todoRoutes);

// handle 404s
// eslint-disable-next-line
app.get((req, res, next) => {
  next(new Error({ status: 404 }));
});

// error handler
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  console.error(err);
  res.sendStatus(err.status || 500);
});

app.listen(port); // Listen on port defined in config file
console.log(`App listening on port ${port}`);
