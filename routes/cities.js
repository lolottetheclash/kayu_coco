const express = require('express');
const router = express.Router();

// Import cities CRUD methods
const {
  getCities,
  createCity,
  getCity,
  updateCity,
  deleteCity,
  getAllTravelsOfCity,
} = require('../controllers/cities');

router.route('/').get(getCities).post(createCity);

router.route('/:id').get(getCity).put(updateCity).delete(deleteCity);

module.exports = router;
