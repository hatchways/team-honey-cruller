const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'conversations',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Message = mongoose.model('messages', MessageSchema);