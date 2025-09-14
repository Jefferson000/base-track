const nodemailer = require('nodemailer');
require('dotenv').config();

const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER; 
const BREVO_SMTP_PASS = process.env.BREVO_SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: BREVO_SMTP_USER,
    pass: BREVO_SMTP_PASS,
  },
});

module.exports = transporter;
