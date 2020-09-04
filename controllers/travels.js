const Travel = require('../models/Travel');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middlewares/async');

// @desc Get All Travels
// @route GET /api/v1/travels
// @access Public
exports.getTravels = asyncHandler(async (req, res, next) => {
  const travels = await Travel.find();
  res.status(200).json({ success: true, count: travels.length, data: travels });
});

// @desc Get Single Travels
// @route GET /api/v1/travels/:id
// @access Public
exports.getTravel = asyncHandler(async (req, res, next) => {
  const travel = await Travel.findById(req.params.id).exec();
  // If travel id requested isn't in DB
  if (!travel) {
    // return to esc from try/catch
    return next(
      new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: travel });
});

// @desc Create Travel
// @route POST /api/v1/travels
// @access Private
exports.createTravel = asyncHandler(async (req, res, next) => {
  const travel = await Travel.create(req.body);
  res.status(201).json({ success: true, data: travel });
});

// @desc Update Travel
// @route PUT /api/v1/travels/:id
// @access Private
exports.updateTravel = asyncHandler(async (req, res, next) => {
  const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // If travel id requested isn't in DB
  if (!travel) {
    // return to esc from try/catch
    return next(
      new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: travel });
});

// @desc Delete Travel
// @route DELETE /api/v1/travels/:id
// @access Private
exports.deleteTravel = asyncHandler(async (req, res, next) => {
  const travel = await Travel.findByIdAndDelete(req.params.id);
  // If travel id requested isn't in DB
  if (!travel) {
    // return to esc from try/catch
    return next(
      new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
