const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errorConstants');
const CustomError = require('./customError');

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  // Check if it's an instance of CustomError (expected operational errors)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }
  console.error("Error Handler: ", err)
  return res.status(500).json({
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
  });
};

module.exports = errorHandler;
