const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')

const { upload }  = require("../controllers/upload")

router.route('/images').post(protect,upload)

module.exports = router;