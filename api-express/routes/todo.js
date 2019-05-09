const express = require('express');

const todoRoutes = express.Router();

const Todo = require('../models/todo');

// get all todo items in the db
todoRoutes.get('/todo/', (req, res, next) => {
  Todo.find(function(err, todos) {
    if (err) {
      return next(new Error(err));
    }

    return res.json(todos); // return all todos
  });
});

// get all todo items in the db
todoRoutes.get('/todo/:id', (req, res, next) => {
  const { id } = req.params;

  Todo.findById(id, function(error, todo) {
    if (error) {
      return next(new Error('Todo was not found'));
    }

    return res.status(200).json(todo);
  });
});

// update a todo item
todoRoutes.put('/todo/:id', function(req, res) {
  const { id } = req.params;

  Todo.findByIdAndUpdate(id, req.body, (err, todo) => {
    if (err) {
      res.status(400).send('Unable to update todo');
    } else {
      res.status(200).json(todo);
    }
  });
});

// add a todo item
todoRoutes.post('/todo/', function(req, res) {
  Todo.create(
    {
      name: req.body.name,
      done: false
    },
    function(error, todo) {
      if (error) {
        res.status(400).send('Unable to create todo list');
      }
      res.status(200).json(todo);
    }
  );
});

// delete a todo item
todoRoutes.delete('/todo/:id', (req, res, next) => {
  const { id } = req.params;

  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) {
      return next(new Error('Todo was not found'));
    }

    return res.status(200).send(todo);
  });
});

module.exports = todoRoutes;
