const nodemailer = require('nodemailer');
require('dotenv').config();
    

// Create a transporter object using your email service provider
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service you prefer
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
