const Travel = require('../models/Travel');

// @desc Get All Travels
// @route GET /api/v1/travels
// @access Public
exports.getTravels = async (req, res, next) => {
  try {
    const travels = await Travel.find();
    res
      .status(200)
      .json({ success: true, count: travels.length, data: travels });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get Single Travels
// @route GET /api/v1/travels/:id
// @access Public
exports.getTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findById(req.params.id).exec();
    // If travel id requested isn't in DB
    if (!travel) {
      // return to esc from try/catch
      return res.status(400).json({ succes: false });
    }
    res.status(200).json({ success: true, data: travel });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Create Travel
// @route POST /api/v1/travels
// @access Private
exports.createTravel = async (req, res, next) => {
  try {
    const travel = await Travel.create(req.body);
    res.status(201).json({ success: true, data: travel });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Update Travel
// @route PUT /api/v1/travels/:id
// @access Private
exports.updateTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // If travel id requested isn't in DB
    if (!travel) {
      // return to esc from try/catch
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: travel });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete Travel
// @route DELETE /api/v1/travels/:id
// @access Private
exports.deleteTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findByIdAndDelete(req.params.id);
    // If travel id requested isn't in DB
    if (!travel) {
      // return to esc from try/catch
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
