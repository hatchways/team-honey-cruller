const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { getWinnersByUser, getSomeWinners } = require('../controllers/winner');

router.route('/').get(protect, getWinnersByUser)
router.route('/:num').get(protect, getSomeWinners)

module.exports = router;