
// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFound };
