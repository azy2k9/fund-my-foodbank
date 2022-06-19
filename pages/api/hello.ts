// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Mailer from 'nodemailer';
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const transport = Mailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

 const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
