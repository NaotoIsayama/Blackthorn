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
                        description: "Flash Tattoo - Skeleton"
                    },
                    unit_amount: 100, //1 dollar for now
                    quantity: 1
                    }
                }
            ]

        })

    } catch (error) {
        
    }
}