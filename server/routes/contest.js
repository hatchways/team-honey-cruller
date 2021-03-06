const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createContest, updateContest, getSingleContest, getAllContests, chooseWinner, getNumContests }  = require("../controllers/contest")

router.route('/').post(protect,createContest).get(getAllContests)
router.route('/num').get(getNumContests)
router.route("/:id").put(protect, updateContest).get(getSingleContest).post(protect, chooseWinner)

module.exports = router;