const express = require('express');
const router = express.Router();
const { createContest, updateContest, getSingleContest, getAllContests }  = require("../controllers/contest")

router.route('/').post(createContest).get(getAllContests)

router.route("/:id").put(updateContest).get(getSingleContest)


module.exports = router;