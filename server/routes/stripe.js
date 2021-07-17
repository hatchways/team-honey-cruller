const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createCustomer, setUpIntents } = require('../controllers/stripe');

router.route('/').post(protect,createCustomer)

router.route('/setup').post(protect,setUpIntents)

module.exports = router
