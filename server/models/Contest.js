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
    prize_amount: {
        type: Number,
        required: true
    },
    deadline_date: {
        type: Date,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = Contest = model("Contest", contestSchema);