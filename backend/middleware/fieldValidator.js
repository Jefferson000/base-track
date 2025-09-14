const { ERROR_CODES } = require("../constants/errorConstants");

exports.validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required field(s): ${missingFields.join(', ')}`, errorCode: ERROR_CODES.FIELD_VALIDATION });
    }
    next(); // Proceed to the next middleware/controller if validation passes
  };
};