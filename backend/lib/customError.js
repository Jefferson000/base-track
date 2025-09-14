class CustomError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
      this.statusCode = statusCode; // HTTP Status code (e.g., 400, 500)
      this.errorCode = errorCode;   // Custom error code (e.g., DUPLICATE_EMAIL)
      this.isOperational = true;    // Flag to distinguish operational errors from bugs
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
  }
  
  module.exports = CustomError;
  