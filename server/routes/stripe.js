const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createCustomer } = require('../controllers/stripe');

router.route('/').post(protect,createCustomer)

module.exports = router
