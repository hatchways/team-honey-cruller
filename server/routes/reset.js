const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { forgotPassword, updatePassword } = require("../controllers/reset");

router.route("/").post(protect, forgotPassword);
router.route("/update-password").put(protect, updatePassword);

module.exports = router;
