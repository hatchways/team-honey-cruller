const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createContest, updateContest, getSingleContest, getAllContests, getContestsByDeadlineDate }  = require("../controllers/contest")

const { createSubmission }  = require("../controllers/submission")


router.route('/').post(protect,createContest).get(getAllContests)
router.route('/deadline/:deadlineDate').get(getContestsByDeadlineDate)
router.route("/:id").put(protect, updateContest).get(protect, getSingleContest)

//route for creating submission object
router.route("/:id/submission").post(protect, createSubmission)

module.exports = router;