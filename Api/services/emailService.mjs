import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config({ path: './Api/config/env/.env' });
export const sendWelcomeEmail = async (req, res) => {
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_SECRET,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'cerberus',
    product: {
      logo: 'https://i.imgur.com/ByUHd2S.png',
      logoHeight: '130px',
      name: 'Uventlo',
      link: 'http://localhost:1337',
    },
    copyright: 'Copyright © 2024 Uventlo. All rights reserved.',
  });

  let response = {
    body: {
      greeting: 'Hello',
      name: req.body.name + '👋 ',
      intro: "Welcome to Uventlo! The Best App to manage your events We're very excited to have you on board with us!",
      action: [
        {
          instructions: " Start managing your events now by clicking the button below 👇 :",
          button: {
            color: '#800080',
            text: 'Launch Uventlo',
            link: 'http://localhost:1337',
          },
        },
        {
          instructions: 'To read our frequently asked questions, please click here:',
          button: {
            text: 'Read our FAQ',
            //link: 'WE WILL ADD IT LATER',
          },
        },
      ],
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: 'uventlo-team@gmail.com',
    to: req.body.email,
    subject: 'Weclome to UVENTLO !',
    html: mail,
    attachments: [
      {
        filename: 'qr-code.png',
        path: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=qr-code-data',
        cid: 'qr-code-image@uventlo.com',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(message);
    return res.status(201).json({
      msg: ' Email is sent successfully',
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};