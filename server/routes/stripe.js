const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createCustomer, setUpIntents, retrieveCustomer, deleteCustomer, createPaymentMethod, createCheckoutSession, chargeCard, addCard, createToken } = require('../controllers/stripe');

router.route('/').post(protect,createCustomer);
router.route('/:id').get(protect, retrieveCustomer).delete(deleteCustomer);
router.route('/stripeToken').post(protect, createToken);
router.route('/setup').post(protect,setUpIntents);
router.route('/payment').post(protect, createPaymentMethod);
router.route('/session').post(protect, createCheckoutSession);
router.route('/charge').post(protect, chargeCard);

module.exports = router
