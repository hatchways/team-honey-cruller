const PersonalInfo = require('../models/PersonalInfo');
const asyncHandler = require("express-async-handler");

exports.createPersonalInfo = asyncHandler(async (req, res) => {
  try {
    const info = PersonalInfo.create({
      userId: req.user.id,
      firstName: req.body.firstName,
      middleInit: req.body.middleInit,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      gender: req.body.gender,
      about: req.body.about
    });
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
