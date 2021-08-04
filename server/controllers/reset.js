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

exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const passwordResetToken = await Token.findOne({ userId: req.body.userId });
    if (!passwordResetToken) {
      res.status(400);
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    if (!isValid) {
      res.status(400);
      throw new Error("Invalid or expired password reset token");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, Number(salt));
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    res.status(200).json({
      message: 'Sucessfully updated password'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
