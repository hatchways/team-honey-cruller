const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')

const { upload, uploadProfilePic }  = require("../controllers/upload")

router.route('/images').post(protect, upload)
router.route('/profile').post(protect, uploadProfilePic)


module.exports = router;