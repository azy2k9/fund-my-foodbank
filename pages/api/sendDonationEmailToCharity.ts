import { NextApiRequest, NextApiResponse } from 'next';
import { SendEmail } from './usecases/SendEmaill';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            let sendEmailUseCase = new SendEmail()
            await sendEmailUseCase.sendMessages(req.body)
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}
