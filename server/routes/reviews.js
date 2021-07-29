const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getAllReviews, createReview, deleteReview } = require('../controllers/reviews');

router.route('/').get(protect, getAllReviews);
router.route('/').post(protect, createReview);
router.route('/').delete(protect, deleteReview);

module.exports = router;
