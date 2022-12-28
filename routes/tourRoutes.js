const express = require('express');
const router = express.Router();

const {
  getAllTours,
  getTourByID,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = router;
