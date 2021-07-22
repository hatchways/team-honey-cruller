const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Message = mongoose.model('Messages', MessageSchema);