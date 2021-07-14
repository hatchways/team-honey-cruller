const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createContest, updateContest, getSingleContest, getAllContests }  = require("../controllers/contest")

const { submitPictures }  = require("../controllers/submission")

router.route('/').post(protect,createContest).get(getAllContests)

router.route("/:id").put(protect, updateContest).get(protect, getSingleContest)

router.route("/:id/submission").post(protect, submitPictures)

module.exports = router;