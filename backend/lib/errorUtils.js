const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errorConstants');
const CustomError = require('./customError');

/**
 * Generic database error handler
 * @param {Error} error - The error object thrown by the database
 * @returns {CustomError} - The corresponding CustomError
 */
function handleDatabaseError(error) {
  // Check for duplicate entry error (e.g., unique constraint violation)
  if (error.code === 'ER_DUP_ENTRY') {
    return new CustomError(ERROR_MESSAGES.DUPLICATE_ENTITY, 400, ERROR_CODES.DUPLICATE_ENTITY);
  }

  // Check for foreign key constraint violation (when trying to delete a record with references)
  if (error.code === 'ER_ROW_IS_REFERENCED') {
    return new CustomError(ERROR_MESSAGES.FOREIGN_KEY_VIOLATION, 400, ERROR_CODES.FOREIGN_KEY_VIOLATION);
  }
  // Check for foreign key constraint violation (when trying to delete a record with references)
  if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    return new CustomError(ERROR_MESSAGES.FOREIGN_KEY_VIOLATION, 400, ERROR_CODES.FOREIGN_KEY_VIOLATION);
  }

  // Handle other database errors
  if (error.code === 'ER_NOT_SUPPORTED_YET') {
    if (error.sqlState === '45001'){
      return new CustomError(ERROR_MESSAGES.EMAIL_DUPLICATED, 400, ERROR_CODES.EMAIL_DUPLICATED);
    } else if (error.sqlState === '45002'){
      return new CustomError(ERROR_MESSAGES.ID_DUPLICATED, 400, ERROR_CODES.ID_DUPLICATED);
    } else if (error.sqlState === '45003'){
      return new CustomError(ERROR_MESSAGES.NAME_DUPLICATED, 400, ERROR_CODES.NAME_DUPLICATED);
    }
  }

  // Handle other database errors
  if (error.code === 'ER_BAD_DB_ERROR') {
    return new CustomError(ERROR_MESSAGES.DATABASE_ERROR, 500, ERROR_CODES.DATABASE_ERROR);
  }

  // Return a generic internal server error for other unexpected cases
  console.error("Error Utils: ", error)
  return new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
}

module.exports = { handleDatabaseError };
