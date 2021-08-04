const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { forgotPassword, resetPassword } = require("../controllers/reset");

router.route("/").post(protect, forgotPassword);
router.route("/reset-password").put(protect, resetPassword);

module.exports = router;
