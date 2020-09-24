const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

// Import cities CRUD methods
const {
  getCities,
  createCity,
  getCity,
  updateCity,
  deleteCity,
  getAllTravelsOfCity,
} = require('../controllers/cities');

router.route('/').get(getCities).post(checkAuth, createCity);

router
  .route('/:id')
  .get(getCity)
  .put(checkAuth, updateCity)
  .delete(checkAuth, deleteCity);

router.route('/:id/travels').get(getAllTravelsOfCity);

module.exports = router;
