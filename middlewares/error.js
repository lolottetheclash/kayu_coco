const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.name = err.name;
  error.message = err.message;

  // Mongoose Bad Request Id
  if (err.name === 'CastError') {
    const message = `Document n°${err.value} does not exist: Bad Id Format`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message);
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Duplicate Entry Error
  if (err.code === 11000) {
    const message = err.message;
    error = new ErrorResponse(message, 409);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;
