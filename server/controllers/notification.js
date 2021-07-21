const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

exports.createNotification = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    //checking if the user has previous notifications
    const previousNotification = await Notification.findOne({
      to: body.to,
      from: req.user.id,
    });

    if (previousNotification) {
      previousNotification.notification =
        previousNotification.notification.concat(body.notification);
      await previousNotification.save();
      res.status(200).json(previousNotification);
    } else {
      const notification = await Notification.create({
        to: body.to,
        from: req.user.id,
        notification: body.notification,
      });
      res.status(201).json(notification);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getAllNotifications = asyncHandler(async (req, res) => {
  try {
    const allNotifications = await Notification.find({
      to: req.user.id,
    });

    res.status(200).json({
      allNotifications,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.deleteAllNotifications = asyncHandler(async (req, res) => {
  try {
    await Notification.remove({ to: req.user.id });
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});
