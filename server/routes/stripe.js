const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createCustomer, setUpIntents, retrieveCustomer, deleteCustomer, createCheckoutSession, chargeCard, attachPaymentMethod } = require('../controllers/stripe');

router.route('/').post(protect,createCustomer);
router.route('/:id').get(protect, retrieveCustomer).delete(deleteCustomer);
router.route('/stripeToken').post(protect, attachPaymentMethod);
router.route('/setup').post(protect,setUpIntents);
router.route('/session').post(protect, createCheckoutSession);
router.route('/charge').post(protect, chargeCard);

module.exports = router
