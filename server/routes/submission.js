const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getSubmissionByContest, getSubmissionsByUser, createSubmission }  = require("../controllers/submission")

router.route('/').get(protect, getSubmissionsByUser)

router.route("/:id").get(protect, getSubmissionByContest).post(protect, createSubmission)

module.exports = router;