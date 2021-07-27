const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.createNotification = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findById(req.user.id);
    const notification = await Notification.create({
      to: body.to,
      from: req.user.id,
      notification: body.notification,
      profilePic: user.profilePic,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getAllNotifications = asyncHandler(async (req, res) => {
  try {
    const allNotifications = await Notification.find({
      to: req.user.id,
    });

    res.status(200).json(allNotifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.updateNotification = asyncHandler(async (req, res) => {
  const body = req.body;
  const newNotification = {
    opened: body.opened,
    to: body.to,
    from: body.from,
    notification: body.notification,
  };

  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      newNotification,
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});
