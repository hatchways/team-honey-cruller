const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createPersonalInfo, getPersonalInfo } = require('../controllers/personalInfo');

router.route('/').post(protect, createPersonalInfo).get(getPersonalInfo);

module.exports = router;
