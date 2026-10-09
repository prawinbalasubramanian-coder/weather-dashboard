/**
 * Centralized Error Handling Middleware for Express
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  
  // Format clean JSON response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred while processing weather data.',
    code: err.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
