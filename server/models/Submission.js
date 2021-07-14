const mongoose = require('mongoose')

const schemaOptions = {
    timestamps: { createdAt: 'created_at' },
};

const submissionSchema = new mongoose.Schema({
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  active: Boolean,
  storeUrl: [String]
}, schemaOptions)

module.exports = mongoose.model('Submission', submissionSchema)