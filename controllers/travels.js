const Travel = require('../models/Travel');
const City = require('../models/City');
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
  const travel = await Travel.findById(req.params.id);
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
  // Check if at least 2 cities to create travel
  if (req.body.cities.length < 2) {
    return next(
      new ErrorResponse('Travel must contains at least 2 cities', 400)
    );
  }

  let travel = { title: req.body.title, cities: [] };
  let newTravel = new Travel(travel);

  let futureTravel = await req.body.cities.map(async city => {
    // Is city already in DB ?
    const existingCity = await City.findOne({ name: city.name });
    if (!existingCity) {
      const newCity = await City.create(city);
      newTravel.cities.push(newCity._id);
      newCity.travels.push(newTravel._id);
      newCity.save();
    } else {
      newTravel.cities.push(existingCity._id);
      existingCity.travels.push(newTravel._id);
      existingCity.save();
    }
  });
  await Promise.all(futureTravel);

  // isoler ce bout de code
  newTravel.save(function (err) {
    if (err)
      return next(
        new ErrorResponse(
          `Error when saving travel : ${err}`.red.underline.bold,
          400
        )
      );
    res.status(201).json({ success: true, data: newTravel });
  });
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
  travel.cities.map(async cityId => {
    await City.findByIdAndUpdate(
      cityId,
      { $pull: { travels: travel._id } },
      {
        new: true,
        runValidators: true,
      }
    );
  });

  // If travel id requested isn't in DB
  if (!travel) {
    // return to esc from try/catch
    return next(
      new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc Get All Cities From Specific Travel
// @desc Get /api/v1/travels/:id/cities
// @desc Public
exports.getAllCitiesOfTravel = asyncHandler(async (req, res, next) => {
  const result = await Travel.findById(req.params.id).populate({
    path: 'cities',
  });
  if (!result) {
    return next(
      new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: result.cities });
});
