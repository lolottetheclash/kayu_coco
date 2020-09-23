const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middlewares/async');

//@desc Get All User
//@route Get /api/v1/users
//@access Public
exports.GetAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

//@desc Get Single User
//@route Get /api/v1/users/:id
//@access Public
exports.GetUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

//@desc Create User
//@route Post /api/v1/users
//@access Private
exports.CreateUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ success: true, data: newUser });
});

//@desc Update User
//@route Get /api/v1/users/:id
//@access Private
exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

//@desc Delete User
//@route Get /api/v1/users/:id
//@access Private
exports.DeleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

//@desc Get All Travels From User
//@route Get /api/v1/users/:id/travels
//@access Public
exports.GetAllTravelsFromUser = asyncHandler(async (req, res, next) => {
  const result = await User.findById(req.params.id).populate({
    path: 'travels',
  });
  if (!result) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: result.travels });
});
