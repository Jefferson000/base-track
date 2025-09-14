const jwt = require('jsonwebtoken');

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken: (payload) =>
    generateToken(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN),
  generateRefreshToken: (payload) =>
    generateToken(payload, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN),
  generateResetToken: (payload) =>
    generateToken(payload, process.env.JWT_RESET_SECRET, process.env.JWT_RESET_SECRET_EXPIRES_IN),
  verifyAccessToken: (token) => verifyToken(token, process.env.JWT_SECRET),
  verifyRefreshToken: (token) => verifyToken(token, process.env.JWT_REFRESH_SECRET),
  verifyResetToken: (token) => verifyToken(token, process.env.JWT_RESET_SECRET),
};  