const express = require('express');
const router = express.Router();

const {
  getAllTours,
  getTourByID,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controllers/tourController');

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = router;
