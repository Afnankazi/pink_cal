const express = require('express');
const todoController = require('../controllers/todo.controller');
const { validate, createTodoSchema, updateTodoSchema } = require('../middleware/validation.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve a list of all todos
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', todoController.getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Retrieve a single todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single todo item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found.
 */
router.get('/:id', todoController.getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo.
 *               description:
 *                 type: string
 *                 description: A detailed description of the todo.
 *     responses:
 *       201:
 *         description: The created todo item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input.
 */
router.post('/', validate(createTodoSchema), todoController.createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update an existing todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the todo.
 *               description:
 *                 type: string
 *                 description: The updated description of the todo.
 *               isCompleted:
 *                 type: boolean
 *                 description: The updated completion status of the todo.
 *     responses:
 *       200:
 *         description: The updated todo item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Todo not found.
 */
router.put('/:id', validate(updateTodoSchema), todoController.updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo successfully deleted (No Content).
 *       404:
 *         description: Todo not found.
 */
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
