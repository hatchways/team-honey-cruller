const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  createNotification,
  getAllNotifications,
  deleteAllNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);
router.route("/").get(protect, getAllNotifications);
router.route("/delete").delete(protect, deleteAllNotifications);

module.exports = router;
