const db = require('../config/db');

exports.login = async (userData) => {
  try {
    const { email, password } = userData;
    const [result] = await db.execute('CALL login(?, ?)', [email, password]);
    return result[0];
  } catch (err) {
    throw err;
  }
};

// Get user email
exports.getUserByEmail = async (email) => {
  try {
    const [result] = await db.execute('CALL get_user_by_email(?)', [email]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
};

// Get user by id
exports.getUserById = async (userId) => {
  try {
    const [result] = await db.execute('CALL get_user_by_id(?)', [userId]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
};

exports.updateUserPassword = async (userId, password) => {
  try {
    const [result] = await db.execute('CALL update_user_password(?, ?)', [userId, password]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
};
