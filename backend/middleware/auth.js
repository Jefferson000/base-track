const { verifyAccessToken } = require('../config/jwt');

const verifyTokenMiddleware = async (req, res, next) => {
  let token = null;
  if (req.cookies?.accessToken) token = req.cookies.accessToken;

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) token = authHeader.slice(7);
  }

  if (!token) return res.status(498).json({ message: 'Authentication token missing or invalid' });

  try {
    const decoded = await verifyAccessToken(token);
    if (decoded.type !== 1) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    req.body.user_id = decoded.id;
    req.query.user_id = decoded.id;
    req.body.company_id = decoded.company_id;
    req.query.company_id = decoded.company_id;
    next();
  } catch (err) {
    return res.status(498).json({ message: 'Invalid or expired token' });
  }
};



module.exports = {
  verifyTokenMiddleware,
};
