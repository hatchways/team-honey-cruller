const { Schema, model } = require('mongoose');

const ReviewsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
    }
  }, { timestamps: true });

module.exports = Reviews = model('Reviews', ReviewsSchema);
