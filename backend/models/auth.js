const db = require('../config/db');

// Save the refresh token in the database
exports.saveRefreshToken = async (refreshToken, userId) => {
  try {
    await db.execute('CALL create_refresh_token(?, ?)', [refreshToken, userId]);
  } catch (err) {
    throw err;
  }
};

exports.deleteRefreshToken = async (refreshToken) => {
    try {
      await db.execute('CALL delete_refresh_token(?)', [refreshToken]);
    } catch (err) {
      throw err;
    }
};



exports.deleteRefreshTokenByUser = async (userId) => {
    try {
      await db.execute('CALL delete_refresh_token_by_user(?)', [userId]);
    } catch (err) {
      throw err;
    }
};


// Find a token in the database
exports.getRefreshToken = async (refreshToken) => {
    try {
      const [result] = await  db.execute('CALL get_refresh_token(?)', [refreshToken]);
      return result[0][0];
    } catch (err) {
      throw err;
    }
};
