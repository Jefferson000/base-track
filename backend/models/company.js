const db = require('../config/db');

exports.getCompany = async (companyId) => {
  try {
    const [result] = await db.execute('CALL get_company(?)', [companyId]);
    const company = result[0][0]
    const acceptance = result[1][0];

    if (company){
      company.acceptance = acceptance
    }
    return company;
  } catch (err) {
    throw err;
  }te
};