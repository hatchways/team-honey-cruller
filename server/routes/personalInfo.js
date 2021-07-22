const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createPersonalInfo } = require('../controllers/personalInfo');

router.route('/').post(protect, createPersonalInfo);

module.exports = router;
