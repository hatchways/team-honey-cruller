const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createCustomer = asyncHandler(async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            email: req.body.email
        })

        res.status(200).json({
            customer: customer
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

exports.setUpIntents = asyncHandler(async (req, res) => {
    try {
        const setupIntents = await stripe.setupIntents.create({});
        const { client_secret } = setupIntents;
        res.status(200).json({
            clientSecret: client_secret
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

exports.chargeCard = asyncHandler(async (req, res) => {
    try {
        const chargeCard = await stripe.paymentIntents.create({
            amount: req.body.amount,
            customer: req.body.customerId,
            currency: 'usd'
        });

        res.status(200).json({
            chargeCard: chargeCard
        });
    } catch (err) {
        res.status(500).json(err);
    }
});