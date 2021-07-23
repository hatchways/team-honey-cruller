const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  getContestByUser,
  updateProfile,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/contests").get(protect, getContestByUser);

module.exports = router;
