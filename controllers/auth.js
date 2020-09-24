const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

//@desc Register/Create User
//@route Post /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  //TODO: token servira quand on envoi le mail de confirmation: il sera contenu dans le lien pour passer le user à actif
  addTokenToCookie(201, newUser, res);
});

//@desc Login User
//@route Post /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please enter your email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  const isMatched = await user.checkPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse('Bad credentials', 401));
  }
  addTokenToCookie(200, user, res);
});

const addTokenToCookie = (statusCode, user, res) => {
  const token = user.getSignedJwt();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, user, token });
};
