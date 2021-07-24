const { Schema, model } = require('mongoose');

const PersonalInfoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String,
  },
  middleInit: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
});

module.exports = model('PersonalInfo', PersonalInfoSchema);
