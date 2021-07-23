const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    recipients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);
