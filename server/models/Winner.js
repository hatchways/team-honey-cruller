const { model, Schema } = require('mongoose')

const WinnerSchema = new Schema({
  contestOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  winningArtist: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  winningPic: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  prizeAmount: Number
})

module.exports = model('Winner', WinnerSchema);