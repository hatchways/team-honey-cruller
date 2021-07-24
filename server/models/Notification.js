const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notification: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false
    },
    profilePic: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
