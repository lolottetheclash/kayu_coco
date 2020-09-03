const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
  res.status(200).json({ success: true, msg: 'Get All Travels' });
});

router.route('/:id').get((req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get Travel Id: ${req.params.id}` });
});

router.route('/').post((req, res, next) => {
  res.status(200).json({ success: true, msg: 'Travel Created' });
});

router.route('/:id').put((req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Travel Id: ${req.params.id} Updated` });
});

router.route('/:id').delete((req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Travel Id: ${req.params.id} Deleted` });
});

module.exports = router;
