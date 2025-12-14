const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use('/api/todos', todoRoutes);

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found.' });
});

// Global error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
