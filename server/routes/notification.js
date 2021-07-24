const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  createNotification,
  getAllNotifications,
  deleteNotification,
  updateNotification
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);
router.route("/").get(protect, getAllNotifications);
router.route("/:id").delete(protect, deleteNotification);
router.route("/update/:id").post(protect, updateNotification);

module.exports = router;
