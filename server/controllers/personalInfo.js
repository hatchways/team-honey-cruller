const PersonalInfo = require('../models/PersonalInfo');
const asyncHandler = require("express-async-handler");

exports.createPersonalInfo = asyncHandler(async (req, res) => {
  try {
    const info = PersonalInfo.create({
      ...req.body
    });
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
