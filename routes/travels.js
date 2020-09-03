const express = require('express');
const router = express.Router();

// Import Travel CRUD Methods
const {
  getTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
} = require('../controllers/travels');

router.route('/').get(getTravels).post(createTravel);

router.route('/:id').get(getTravel).put(updateTravel).delete(deleteTravel);

module.exports = router;
