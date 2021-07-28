const Reviews = require('../models/Reviews');
const asyncHandler = require('express-async-handler');

exports.getAllReviews = asyncHandler(async (req, res) => {
  try {
    const info = await Reviews.find({
      userId: "60ef477aa875e15d00c7c51e"
    });

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.createReview = asyncHandler(async (req, res) => {
  try {
    const review = await Reviews.create({
      ...req.body
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});
