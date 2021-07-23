const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createOrUpdatePersonalInfo, getPersonalInfo } = require('../controllers/personalInfo');

router.route('/').post(protect, createOrUpdatePersonalInfo).get(getPersonalInfo);

module.exports = router;
