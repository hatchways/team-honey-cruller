const { Schema, model } = require("mongoose");

const contestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prizeAmount: {
        type: Number,
        required: true
    },
    deadlineDate: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        type: String
    }],
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    active: {
      type: Boolean,
      default: true
    }
});


module.exports = Contest = model("Contest", contestSchema);