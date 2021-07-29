const Reviews = require('../models/Reviews');
const asyncHandler = require('express-async-handler');

exports.getAllReviews = asyncHandler(async (req, res) => {
  try {
    const review = await Reviews.find({
      artistId: req.user.id,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.createReview = asyncHandler(async (req, res) => {
  try {
    const review = await Reviews.create({
      reviewerId: req.user.id,
      ...req.body
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.deleteReview = asyncHandler(async (req, res) => {
  try {
    const review = await Reviews.deleteOne({
      reviewerId: req.user.id,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});
