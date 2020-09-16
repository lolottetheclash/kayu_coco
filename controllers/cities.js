const City = require('../models/City');
const Travel = require('../models/Travel');

const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');

let _ = require('lodash');

// @desc GET All Cities
// @route GET /api/v1/cities
// @access Public
exports.getCities = asyncHandler(async (req, res, next) => {
  const cities = await City.find();
  res.status(200).json({ success: true, count: cities.length, data: cities });
});

// @desc GET Single City
// @route /api/cities/:id
// @access Public
exports.getCity = asyncHandler(async (req, res, next) => {
  const city = await await City.findById(req.params.id);
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: city });
});

// @desc Create City
// @route POST /api/cities
// @ access Private
exports.createCity = asyncHandler(async (req, res, next) => {
  const city = await City.create(req.body);
  res.status(201).json({ success: true, data: city });
});

// @desc Update City
// route PUT /api/cities/:id
// @access Private
exports.updateCity = asyncHandler(async (req, res, next) => {
  const city = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: city });
});

// @desc Delete City
// @route DELETE /api/cities/:id
// @access Private
exports.deleteCity = asyncHandler(async (req, res, next) => {
  const city = await City.findByIdAndDelete(req.params.id);
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc Get All Travels Which includes a Specific City
// @route /api/v1/cities/:id/travels
// @access Public
exports.getAllTravelsOfCity = asyncHandler(async (req, res, next) => {
  const result = await City.findById(req.params.id).populate({
    path: 'travels',
  });
  if (!result) {
    return next(
      new ErrorResponse(`City not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: result.travels });
});
