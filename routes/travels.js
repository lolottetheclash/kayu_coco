const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

// Import Travel CRUD Methods
const {
  getTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
  getAllCitiesOfTravel,
} = require('../controllers/travels');

router.route('/').get(getTravels).post(checkAuth, createTravel);

router
  .route('/:id')
  .get(getTravel)
  .put(checkAuth, updateTravel)
  .delete(checkAuth, deleteTravel);

router.route('/:id/cities').get(getAllCitiesOfTravel);

module.exports = router;
