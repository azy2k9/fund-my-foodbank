import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';

import Stripe from 'stripe';
import prisma from '../../../utils/prisma';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

type Data = {
    foodbank_name: string;
    donator_email: string;
    amount: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${req.headers.origin}/donation-successfull`,
                cancel_url: `${req.headers.origin}/checkout?cancelled=true`,
            });

            // const donationCreated = await prisma.donation.create({
            //     data: {
            //         amount: price.unit_amount,
            //         email:  "test@gmail.com",
            //         total: price.unit_amount,
            //         // TODO: Add the selected foodbank(s) to this donation.
            //         // TODO: Check if user is authed and if they are, connect the user to this record
            //     }
            // });

            res.status(200).json({ 
                amount: ,
                foodbank_name: ,
                donator_email: 
             });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
