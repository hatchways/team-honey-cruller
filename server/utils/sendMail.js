const nodemailer = require('nodemailer');

const sendMail = (user, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const options = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: user.email,
    subject: 'Honey Cruller - Reset Password',
    text:
      `Hello ${user.username},\n\n` +
      `Please click on the following link to reset your password:\n` +
      `http://localhost:3000/reset-password/${token}\n`
  };

  transporter.sendMail(options, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = sendMail;
