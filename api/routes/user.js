const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/register', (req, res, next) => {
  if (req.session.user) {
    return res.sendStatus(401);
  }

  const newUser = new User(req.body);

  // hash password
  newUser.password = bcrypt.hashSync(req.body.password, 8);

  newUser
    .save(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  if (req.session.user) {
    req.session.touch();
    return res.send(req.session.user);
  }

  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) return next(err);

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.sendStatus(401);
      }

      req.session.user = user;
      delete req.session.user.password;

      res.send(req.session.user);
    }
  );
});

// eslint-disable-next-line
router.post('/logout', (req, res, next) => {
  if (!req.session.user) return res.sendStatus(400);

  req.session.destroy();
  return res.sendStatus(200);
});

module.exports = router;
