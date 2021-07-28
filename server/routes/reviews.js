const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getAllReviews, createReview } = require('../controllers/reviews');

router.route('/').get(getAllReviews);
router.route('/').post(protect, createReview);

module.exports = router;
