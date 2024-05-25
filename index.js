const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

const htmlTemplate = fs.readFileSync('email_template.html', 'utf8');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465, // Yahoo SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const recipientEmails = process.env.RECIPIENT_EMAILS.split(',');

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recipientEmails,
    subject: 'Email Test',
    html: htmlTemplate // Use the HTML template content here
})
.then(info => {
    console.log('Email sent:', info.response);
})
.catch(error => {
    console.error('Error occurred:', error);
});
