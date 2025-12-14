const { v4: uuidv4 } = require('uuid');

// In-memory data store for todos
let todos = [];

/**
 * Represents a Todo item.
 * @typedef {object}
 * @property {string} id - Unique identifier for the todo.
 * @property {string} title - The title of the todo.
 * @property {string} description - A detailed description of the todo.
 * @property {boolean} isCompleted - Indicates if the todo is completed.
 * @property {string} createdAt - Timestamp when the todo was created (ISO string).
 */

/**
 * Creates a new todo item.
 * @param {object} todoData - Data for the new todo (title, description).
 * @returns {Todo} The newly created todo item.
 */
const create = (todoData) => {
  const newTodo = {
    id: uuidv4(),
    title: todoData.title,
    description: todoData.description || '', // Default to empty string if not provided
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return newTodo;
};

/**
 * Retrieves all todo items.
 * @returns {Todo[]} An array of all todo items.
 */
const findAll = () => {
  return todos;
};

/**
 * Retrieves a todo item by its ID.
 * @param {string} id - The ID of the todo item to retrieve.
 * @returns {Todo|undefined} The todo item if found, otherwise undefined.
 */
const findById = (id) => {
  return todos.find(todo => todo.id === id);
};

/**
 * Updates an existing todo item.
 * @param {string} id - The ID of the todo item to update.
 * @param {object} updateData - The data to update (title, description, isCompleted).
 * @returns {Todo|undefined} The updated todo item if found, otherwise undefined.
 */
const update = (id, updateData) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updateData };
    return todos[index];
  }
  return undefined;
};

/**
 * Deletes a todo item by its ID.
 * @param {string} id - The ID of the todo item to delete.
 * @returns {boolean} True if the todo was deleted, false otherwise.
 */
const remove = (id) => {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  return todos.length < initialLength;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
