const Reviews = require('../models/Reviews');
const asyncHandler = require('express-async-handler');

exports.getAllReviews = asyncHandler(async (req, res) => {
  try {
    const info = await Reviews.find({
      userId: req.user.id
    });

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.createReview = asyncHandler(async (req, res) => {
  try {
    const review = await Reviews.create({
      userId: req.userId,
      reviews: [{
        ...req.body
      }]
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});
