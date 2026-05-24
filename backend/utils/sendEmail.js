const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // e.g. you@gmail.com
      pass: process.env.EMAIL_PASS  // your 16-character App Password
    }
  });

  // Define email options
  const mailOptions = {
    from: `"CUSoC Team" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // We don't throw here to avoid crashing the whole application flow if email fails
  }
};

module.exports = sendEmail;
