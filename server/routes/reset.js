const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { forgotPassword } = require("../controllers/reset");

router.route("/").post(protect, forgotPassword);

module.exports = router;
