import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const inventory = await stripe.products.list();
            res.status(200).send(inventory);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}
