const express = require('express');
const router = express.Router();

// Import User CRUD methods
const {
  GetUser,
  GetAllUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetAllTravelsFromUser,
} = require('../controllers/users');

router.route('/').get(GetAllUsers).post(CreateUser);

router.route('/:id').get(GetUser).put(UpdateUser).delete(DeleteUser);

router.route('/:id/travels').get(GetAllTravelsFromUser);

module.exports = router;
