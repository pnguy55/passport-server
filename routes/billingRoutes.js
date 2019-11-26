//REMEMBER THIS NEEDS TO HAVE THE KEY HERE
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post("/api/stripe", requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        })

        // this is how to access the current user and save new info to it
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);

    });
};