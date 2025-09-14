
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const transporter = require("../config/brevo");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyResetToken, generateResetToken } = require('../config/jwt');
const { saveRefreshToken, deleteRefreshToken, getRefreshToken, deleteRefreshTokenByUser } = require('../models/auth');
const { handleDatabaseError } = require('../lib/errorUtils');
const { ERROR_MESSAGES, ERROR_CODES } = require('../constants/errorConstants');
const { encryptData } = require('../lib/encript');
const { resetPasswordEmail } = require('../constants/email');


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const type = parseInt(req.params.type);
  try {
    const user = await UserModel.getUserByEmail(email);
    // 1 - Master/Mobile/Customer Login
    // 2 - Mobile Login
    // User Type: 1-Master 2-Mobile 3-Customer
    if (!user) {
      return res.status(401).json({ message: ERROR_MESSAGES.WRONG_CREDENTIALS, errorCode: ERROR_CODES.WRONG_CREDENTIALS });
    } 
    const userType = user.type;
    const login = type == 1 ? ( userType == 1 || userType === 2 ||userType == 3 ) : ( userType == 1 || userType == 2)
    if (!login ||!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: ERROR_MESSAGES.WRONG_CREDENTIALS, errorCode: ERROR_CODES.WRONG_CREDENTIALS });
    }

    const accessToken = generateAccessToken({ id: user.id, company_id: user.company_id, type: user.type });
    const refreshToken = generateRefreshToken({ id: user.id, company_id: user.company_id, type: user.type });
    
    // Approach working in local
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: process.env.COOKIE_EXPIRES_IN * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: process.env.COOKIE_REFRESH_EXPIRES_IN * 60 * 1000
    });

    await deleteRefreshTokenByUser(user.id);
    await saveRefreshToken(refreshToken, user.id);
    const returnUser = await UserModel.getUserById(user.id);
    console.log(returnUser)
    const encryptedUserInfo = encryptData({
      name: returnUser.name,
      company_logo: returnUser.company_logo,
      signature: returnUser.signature,
      type: returnUser.type,
      id: returnUser.id
    });

    res.status(200).json({ data: encryptedUserInfo });

  } catch (err) {
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};


exports.logout = async (req, res, next) => {
  let refreshToken = null;
  if (req.cookies?.refreshToken) {
    refreshToken = req.cookies.refreshToken;
  }

  if (!refreshToken && req.headers.refreshtoken) {
    refreshToken = req.headers.refreshtoken;
  }
  try {

    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'None' });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });

    await deleteRefreshToken(refreshToken);

    res.json({ message: 'Successfully logged out' });
  } catch (err) {
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};

exports.refresh = async (req, res, next) => {
  let refreshToken = null;
  if (req.cookies?.refreshToken) {
    refreshToken = req.cookies.refreshToken;
  }

  if (!refreshToken && req.headers.refreshtoken) {
    refreshToken = req.headers.refreshtoken;
  }

  try {
    if(!refreshToken){
      return res.status(401).json({ message: 'Invalid or revoked refresh token' });
    }
    
    const tokenInDb = await getRefreshToken(refreshToken);
    if (!tokenInDb) {
      return res.status(401).json({ message: 'Invalid or revoked refresh token' });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      company_id: decoded.company_id,
      type: decoded.type
    });
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: process.env.COOKIE_EXPIRES_IN * 60 * 1000
    });

    const returnUser = await UserModel.getUserById(decoded.id);

    const encryptedUserInfo = encryptData({
      name: returnUser.name,
      company_logo: returnUser.company_logo,
      type: returnUser.type
    });

    res.status(200).json({ data: encryptedUserInfo });
  } catch (err) {
    if(refreshToken){
      await deleteRefreshToken(refreshToken);
    }
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};

exports.reset = async (req, res, next) => {
  const { token, password } = req.body;

  try {

    const decoded = verifyResetToken(token);

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.updateUserPassword(decoded.id, hashedPassword);

    res.status(200).json({ message: "Password reset successfuly" });
  } catch (err) {
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};

exports.recovery = async (req, res, next) => {
  try {

    const userEmail = req.params.email;
    const user = await UserModel.getUserByEmail(userEmail);

    if (!user){
      return res.status(404).json({ message: ERROR_MESSAGES.ENTITIES_NOT_FOUND, errorCode: ERROR_CODES.ENTITIES_NOT_FOUND });
    }

    const resetToken = generateResetToken({ id: user.id, email: userEmail });

    const emailHtml = resetPasswordEmail.body
      .replace("{{NAME}}", user.name)
      .replace("{{RESET_TOKEN}}", resetToken);

    const mailOptions = {
      from: 'noreplay@h2otrack.com',
      to: userEmail,
      subject: resetPasswordEmail.subject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset token created successfuly" });
  } catch (err) {
    const handledError = handleDatabaseError(err);
    return next(handledError);
  }
};

exports.validate = async (req, res, next) => {
  try {
    const resetToken = req.params.token;
    verifyResetToken(resetToken);

    res.status(200).json({ message: "Token Correct!" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
