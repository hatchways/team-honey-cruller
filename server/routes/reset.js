const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { forgotPassword, resetPassword, changePassword } = require("../controllers/reset");

router.route("/").post(forgotPassword);
router.route("/update-password/:id").patch(resetPassword);
router.route("/change-password").patch(protect, changePassword);

module.exports = router;
