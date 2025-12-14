/**
 * Global error handling middleware.
 * Catches errors passed from routes/controllers and sends a standardized JSON response.
 * @param {Error} err - The error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred.';

  res.status(statusCode).json({
    error: {
      message: message,
      // In production, avoid sending stack traces to clients
      // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler;
