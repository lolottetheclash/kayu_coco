// @desc Get All Travels
// @route GET /api/v1/travels
// @access Public
exports.getTravels = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Get All Travels' });
};

// @desc Get Single Travels
// @route GET /api/v1/travels/:id
// @access Public
exports.getTravel = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get Travel Id: ${req.params.id}` });
};

// @desc Create Travel
// @route POST /api/v1/travels
// @access Private
exports.createTravel = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Travel Created' });
};

// @desc Update Travel
// @route PUT /api/v1/travels/:id
// @access Private
exports.updateTravel = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Travel Id: ${req.params.id} Updated` });
};

// @desc Delete Travel
// @route DELETE /api/v1/travels/:id
// @access Private
exports.deleteTravel = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Travel Id: ${req.params.id} Deleted` });
};
