// errorConstants.js

const ERROR_CODES = {
    DUPLICATE_ENTITY: 'DUPLICATE_ENTITY',
    ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
    ENTITIES_NOT_FOUND: 'ENTITIES_NOT_FOUND',
    DATABASE_ERROR: 'DATABASE_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    FOREIGN_KEY_VIOLATION: 'FOREIGN_KEY_VIOLATION',
    FIELD_VALIDATION: 'FIELD_VALIDATION',
    FIELD_VALIDATION: 'FIELD_VALIDATION',
    WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
    NO_IMAGE_PROVIDED: 'NO_IMAGE_PROVIDED',
    FAIL_IMAGE_UPLOAD: 'FAIL_IMAGE_UPLOAD',
    FAIL_SEND_EMAIL: 'FAIL_SEND_EMAIL',
    NO_DEFAUT_EMAIL: 'NO_DEFAUT_EMAIL',
    EMAIL_DUPLICATED: 'EMAIL_DUPLICATED',
    ID_DUPLICATED: 'ID_DUPLICATED',
    NAME_DUPLICATED: 'NAME_DUPLICATED',
  };

  const ERROR_MESSAGES = {
    DUPLICATE_ENTITY: 'Entity is duplicaded.',
    ENTITY_NOT_FOUND: 'Entity not found.',
    ENTITIES_NOT_FOUND: 'Entities not found',
    DATABASE_ERROR: 'A database error occurred. Please try again later.',
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
    VALIDATION_ERROR: 'Invalid data provided.',
    FOREIGN_KEY_VIOLATION: 'Cannot delete the entity as it has dependent records.',
    WRONG_CREDENTIALS: 'Wrong Credentials.',
    NO_IMAGE_PROVIDED: 'Image no provided.',
    FAIL_IMAGE_UPLOAD: 'Error when uploading image.',
    FAIL_SEND_EMAIL: 'Error when sending email.',
    NO_DEFAUT_EMAIL: 'There is no default email for this company.',
    EMAIL_DUPLICATED: 'Email already registered.',
    ID_DUPLICATED: 'ID already registered.',
    NAME_DUPLICATED: 'Name already registered.',
  };
  
  const HTTP_STATUS_CODES = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error',
    422: 'Unprocessable Entity', // For validation errors
  };
  
  module.exports = { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES };
  