const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createContest, updateContest, getSingleContest, getAllContests, getContestsByDeadlineDate }  = require("../controllers/contest")

router.route('/').post(protect,createContest).get(getAllContests)
router.route('/deadline').get(getContestsByDeadlineDate)
router.route("/:id").put(protect, updateContest).get(protect, getSingleContest)

module.exports = router;