const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    lastMessage: {
        type: String,
    },
});

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema);