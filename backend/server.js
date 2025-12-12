const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const port = process.env.PORT || 5000;


// Middleware
app.use(cors());

app.use(bodyParser.json());












const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider
    auth: {
        user: 'nanjivhoravhora@gmail.com ', // Your email address
        pass: 'tfyz tnfy udvl lhen'     // Your email password or App Password
    }
});

const recipientEmail = ' nanjivhoravhora@gmail.com'; // The email address where you want to receive submissions
// --- CONFIGURATION END ---





















// API Endpoint for sending email
app.post('/send-email', (req, res) => {
    const { formType, ...formData } = req.body;

    let subject = '';
    let htmlBody = '';

    if (formType === 'contact') {
        subject = 'New Contact Form Submission';
        htmlBody = `
            <h2>New "Get in Touch" Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Mobile:</strong> ${formData.mobile}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
        `;
    } else if (formType === 'consultation') {
        subject = 'New Consultation Booking';
        const meetingTime = new Date(formData.timing).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        htmlBody = `
            <h2>New "Free Consultation" Booking</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Mobile:</strong> ${formData.mobile}</p>
            <p><strong>Preferred Timing:</strong> ${meetingTime}</p>
        `;
    } else {
        return res.status(400).send('Invalid form type.');
    }

    const mailOptions = {
        from: transporter.options.auth.user,
        to: recipientEmail,
        subject: subject,
        html: htmlBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email. Please check server logs.');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
