const nodemailer = require('nodemailer');

const {
  smtpHost,
  smtpPort,
  smtpEmail,
  smtpPassword,
  fromName,
  fromEmail,
} = require('../../config/keys');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  });

  const message = {
    from: `${fromName} <${fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
