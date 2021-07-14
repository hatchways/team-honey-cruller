const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createContest, updateContest, getSingleContest, getAllContests }  = require("../controllers/contest")

const { getImages }  = require("../controllers/submission")

router.route('/').post(protect,createContest).get(getAllContests)

router.route("/:id").put(protect, updateContest).get(protect, getSingleContest)

router.route("/:id/submission").get(protect, getImages)

module.exports = router;