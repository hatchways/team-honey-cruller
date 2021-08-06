const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getAllReviews, createReview, deleteReview, getReviewsForAll } = require('../controllers/reviews');

router.route('/:id').get(protect, getAllReviews);
router.route('/').post(protect, createReview).get(getReviewsForAll);
router.route('/:id').delete(protect, deleteReview);

module.exports = router;
