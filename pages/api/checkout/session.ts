import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';

import Stripe from 'stripe';
import prisma from '../../../utils/prisma';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

type ReqBody = {
    plan: string;
    foodbank_names: Array<string>;
    donator_email: string;
    amount: number;
    donator_name: string;
};

type Data = {
    foodbank_names: Array<string>;
    donator_email: string;
    donator_name: string;
    amount: number;
    sessionId: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const {
                plan: lookup_key,
                amount,
                donator_email,
                donator_name,
                foodbank_names,
            } = req.body as ReqBody;

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
                success_url: `${
                    req.headers.origin
                }/donation-successful?amount=${amount}&donator_email=${donator_email}&donator_name=${donator_name}&foodbank_names=${JSON.stringify(
                    foodbank_names,
                )}`,
                cancel_url: `${req.headers.origin}/checkout?cancelled=true`,
            });

            // const donationCreated = await prisma.donation.create({
            //     data: {
            //         amount,
            //         email: donator_email,
            //         total: amount,
            //         // TODO: Add the selected foodbank(s) to this donation.
            //         // TODO: Check if user is authed and if they are, connect the user to this record
            //     }
            // });

            res.status(200).json({
                amount,
                donator_email,
                donator_name,
                foodbank_names,
                sessionId: session.id,
            });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
