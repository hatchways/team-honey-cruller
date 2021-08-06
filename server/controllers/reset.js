const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const passwordToken = require('../utils/passwordToken');

exports.forgotPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      res.status(404);
      throw new Error("Email not found");
    }

    const token = passwordToken(user._id);

    sendMail(user, token);
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    await User.findOne({ _id: req.params.id })
      .then(async (user) => {
        const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);

        if (payload.userId === user.id) {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(req.body.password, salt);

          await User.updateOne(
            { _id: req.params.id },
            { $set: { password: hash } },
            { new: true }
          );
        }
      })
    res.status(200).json({
      message: 'Sucessfully updated password'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await User.updateOne(
      { _id: req.user.id},
      { $set: { password: hash } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
