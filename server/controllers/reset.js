const User = require("../models/User");
const Token = require("../models/Token");
const asyncHandler = require("express-async-handler");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/sendMail');

exports.forgotPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      res.status(404);
      throw new Error("Email not found");
    }

    const token = await Token.findOne({
      userId: user._id
    });
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(resetToken, salt);

    await Token.create({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    });

    sendMail(user, hash);
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
