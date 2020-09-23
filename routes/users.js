const express = require('express');
const router = express.Router();

// Import User CRUD methods except Post/Create user which is in auth controller
const {
  GetUser,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  GetAllTravelsFromUser,
} = require('../controllers/users');

router.route('/').get(GetAllUsers);

router.route('/:id').get(GetUser).put(UpdateUser).delete(DeleteUser);

router.route('/:id/travels').get(GetAllTravelsFromUser);

module.exports = router;
