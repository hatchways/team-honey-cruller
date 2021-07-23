const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getSubmissionByContest, getSubmissionsByUser }  = require("../controllers/submission")

router.route('/').get(protect, getSubmissionsByUser)

router.route("/:id").get(protect, getSubmissionByContest)

module.exports = router;