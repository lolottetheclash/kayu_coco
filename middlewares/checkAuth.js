const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

const checkAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorResponse('No token, authorization denied', 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // add userId from payload
  req.userId = decoded.id;
  next();
};

module.exports = checkAuth;
