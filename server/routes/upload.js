const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')

const { upload, uploadProfilePic, uploadSubmissionPic }  = require("../controllers/upload")

router.route('/images').post(protect, upload)
router.route('/profile').post(protect, uploadProfilePic)
router.route('/submission').post(protect, uploadSubmissionPic)

module.exports = router;