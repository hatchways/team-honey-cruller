const { Schema, model } = require('mongoose');

cosnt ReviewsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
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
      createdAt: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
      }
    },
  ]
});

module.exports = Reviews = model('Reviews', ReviewsSchema);
