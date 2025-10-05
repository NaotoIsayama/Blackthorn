const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: "Flash Tattoo",
                        description: "Disclaimer. This payment page is in test mode, and will not accept real card info. You can use a test card number, 4242 4242 4242 4242, along with any valid future expiration date and cvc to simulate a purchase"
                    },
                    unit_amount: 100, //1 dollar for now
                },
                quantity: 1
            }],
            success_url: "https://blackthorntattoo.naotoisayama.com/depositsuccess?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "https://blackthorntattoo.naotoisayama.com/cancel",
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({url: session.url})
        };

    } catch (error) {
        // error handling code
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        };
    }
}