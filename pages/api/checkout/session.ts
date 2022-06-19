import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { plan: lookup_key } = req.body;
            const prices = await stripe.prices.list({
                lookup_keys: [lookup_key],
                expand: ['data.product'],
            });
            const price = prices.data[0];

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: price.id,
                        // For metered billing, do not pass quantity
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${req.headers.origin}/donation-successfull`,
                cancel_url: `${req.headers.origin}/checkout?cancelled=true`,
            });

            res.status(200).json({ sessionId: session.id });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
