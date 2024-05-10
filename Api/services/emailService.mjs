import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config({ path: './Api/config/env/.env' });

const createMailGenerator = () => {
  return new Mailgen({
    theme: 'cerberus',
    product: {
      name: 'Uventlo',
      link: 'http://localhost:1337',
      logo: 'https://i.imgur.com/ByUHd2S.png',
      logoHeight: '130px',
    },
    copyright: 'Copyright © 2024 Uventlo. All rights reserved.',
  });
};

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    const message = { from: 'uventlo-team@gmail.com', to: email, subject, html };
    const info = await transporter.sendMail(message);

    return { messageId: info.messageId, preview: nodemailer.getTestMessageUrl(info) };
  } catch (err) {
    throw new Error(`Failed to send email: ${err}`);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  const mailGenerator = createMailGenerator();

  const response = {
    body: {
      greeting: 'Hello',
      name: Name + '👋 ',
      intro: "Welcome to Uventlo! The Best App to manage your events , Thank you for confirming your account We're very excited to have you on board with us!",
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
            link: 'WE WILL ADD IT LATER',
          },
        },
      ],
    },
  };

  const html = mailGenerator.generate(response);

  return sendEmail(email, 'Welcome to UVENTLO !', html);
};

export const sendResetPasswordEmail = async (email, otp) => {
  const mailGenerator = createMailGenerator();

  const response = {
    body: {
      greeting: 'Greetings!',
      intro: 'You have requested a password reset for your Uventlo account. Use the following one-time password to reset your password:',
      action: {
        instructions: 'One-Time Password (OTP):',
        button: {
          text: otp,
          link: 'http://localhost:1337/reset-password',
        },
      },
      outro: 'If you did not request a password reset, please ignore this email.',
    },
  };

  const html = mailGenerator.generate(response);

  return sendEmail(email, 'Password Reset OTP', html);
};

export const sendConfirmationCode = async (email, code) => {
  const mailGenerator = createMailGenerator();

  const response = {
    body: {
      greeting: 'Greetings!',
      intro: 'Welcome to Uventlo! The Best App to manage your events , Please use the following confirmation code to activate your account:',
      action: {
        instructions: 'Confirmation Code:',
        button: {
          text: code,
          link: 'http://localhost:1337/verify-code',
        },
      },
      outro: 'Activate your account now to start managing your events!',
    },
  };

  const html = mailGenerator.generate(response);

  return sendEmail(email, 'Uventlo Account Confirmation', html);
};

export const sendDeactivationEmail = async (user, email) => {
  const mailGenerator = createMailGenerator();

  const response = {
    body: {
      greeting: `Dear ${user}`,
      intro: "We are saddened to inform you that your Uventlo account has been deactivated upon your request.",
      outro: "We genuinely appreciate your time with us, and should you ever decide to return, we will welcome you back with open arms.",
    },
  };

  const html = mailGenerator.generate(response);

  return sendEmail(email, 'Farewell from Uventlo 😔', html);
};
