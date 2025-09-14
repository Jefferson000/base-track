const { ERROR_MESSAGES, ERROR_CODES } = require('../constants/errorConstants');
const { handleDatabaseError } = require('../lib/errorUtils');
const CompanyModel = require('../models/company');


exports.getCompany = async (req, res, next) => {
  try {
    const companyId = req.query.company_id;

    const result = await CompanyModel.getCompany(companyId);

    if (!result) {
      return res.status(404).json({ message: ERROR_MESSAGES.ENTITY_NOT_FOUND, errorCode: ERROR_CODES.ENTITY_NOT_FOUND });
    }

    res.status(200).json(result);
  } catch (err) {
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};
