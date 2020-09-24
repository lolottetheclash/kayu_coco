const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

// Import User CRUD methods except Post/Create user which is in auth controller
const {
  GetUser,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  GetAllTravelsFromUser,
} = require('../controllers/users');

router.route('/').get(GetAllUsers);

router
  .route('/:id')
  .get(GetUser)
  .put(checkAuth, UpdateUser)
  .delete(checkAuth, DeleteUser);

router.route('/:id/travels').get(GetAllTravelsFromUser);

module.exports = router;
