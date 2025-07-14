// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Use dotenv to manage env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // example: 10team.daimapay@gmail.com
    pass: process.env.EMAIL_PASS, // use Gmail App Password
  }
});

app.post('/api/send-login-email', async (req, res) => {
  const { userEmail, userRole, timestamp } = req.body;

  if (!userEmail || !userRole || !timestamp) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const mailOptions = {
    from: `"Login Alert" <no-reply@daimapay.com>`,
    to: 'team.daimapay@gmail.com',
    subject: `New Login Detected`,
    text: `User ${userEmail} logged in as ${userRole} at ${timestamp}`,
    html: `<p><strong>Email:</strong> ${userEmail}</p><p><strong>Role:</strong> ${userRole}</p><p><strong>Time:</strong> ${timestamp}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
