const PersonalInfo = require('../models/PersonalInfo');
const asyncHandler = require("express-async-handler");

exports.createPersonalInfo = asyncHandler(async (req, res) => {
  try {
    const hasSubmitted = await PersonalInfo.findOne({
      user: req.user.id
    });
    if (hasSubmitted) {
      hasSubmitted = {...req.body};
      await hasSubmitted.save();
      res.status(201).json(hasSubmitted);
    } else {
      const info = await PersonalInfo.create({
        ...req.body
      });
      res.status(201).json(info);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getPersonalInfo = asyncHandler(async (req, res) => {
  try {
    const info = await PersonalInfo.find({
      userId: req.user.id
    });

    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
