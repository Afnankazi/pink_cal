const todoModel = require('../models/todo.model');

/**
 * Get all todo items.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getAllTodos = (req, res, next) => {
  try {
    const todos = todoModel.findAll();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single todo item by ID.
 * @param {object} req - Express request object (expects req.params.id).
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getTodoById = (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = todoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new todo item.
 * @param {object} req - Express request object (expects req.body with title, description).
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const createTodo = (req, res, next) => {
  try {
    const newTodo = todoModel.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing todo item by ID.
 * @param {object} req - Express request object (expects req.params.id and req.body for updates).
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTodo = todoModel.update(id, req.body);

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a todo item by ID.
 * @param {object} req - Express request object (expects req.params.id).
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = todoModel.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(204).send(); // No content to send back on successful deletion
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
