const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getSubmissionByContest }  = require("../controllers/submission")

router.route("/:id").get(protect, getSubmissionByContest)

module.exports = router;