const bcrypt = require('bcryptjs');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

//@desc Register/Create User
//@route Post /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // Token creation
  const token = newUser.getSignedJwt();

  //TODO: token servira quand on envoi le mail de confirmation: il sera contenu dans le lien pour passer le user à actif

  res.status(201).json({ success: true, data: newUser, token });
});

//@desc Login User
//@route Post /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please enter your email and password', 400));
  }

  const user = await User.findOne({ email });

  const isMatched = await user.checkPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse('Bad credentials', 401));
  }

  const token = user.getSignedJwt();
  // creer jwt +le stocker ds les cookies
  // creer middleware de securité qui va checker le cookie: si token correspondnat ua user alors ok sinon err

  res.status(200).json({ success: true, data: user, token });
});
