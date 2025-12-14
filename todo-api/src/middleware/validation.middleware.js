const Joi = require('joi');

// Joi schema for creating a new todo
const createTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
  }),
  description: Joi.string().trim().allow('').optional(),
});

// Joi schema for updating an existing todo
const updateTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).optional().messages({
    'string.empty': 'Title cannot be empty',
  }),
  description: Joi.string().trim().allow('').optional(),
  isCompleted: Joi.boolean().optional(),
}).min(1).messages({
  'object.min': 'At least one field (title, description, or isCompleted) must be provided for update.',
});

/**
 * Middleware to validate request body against a Joi schema.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against.
 * @returns {function} Express middleware function.
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  validate,
};
