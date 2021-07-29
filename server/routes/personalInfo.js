const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const { createOrUpdatePersonalInfo, getPersonalInfo, getInfoById } = require('../controllers/personalInfo');

router.route('/').post(protect, createOrUpdatePersonalInfo).get(getPersonalInfo);

//route for getting Personal info of artist
router.route('/:id').get(protect,getInfoById);

module.exports = router;
