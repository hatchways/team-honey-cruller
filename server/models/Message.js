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
    body: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema);