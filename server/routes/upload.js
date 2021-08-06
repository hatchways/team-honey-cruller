const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')
const {
    upload,
    uploadProfilePic,
    uploadSubmissionPic,
    uploadContestPic
} = require("../controllers/upload")

router.route('/images').post(protect, upload)
router.route('/profile').post(protect, uploadProfilePic)
router.route('/submission').post(protect, uploadSubmissionPic)
router.route('/contest').post(protect, uploadContestPic)

module.exports = router;