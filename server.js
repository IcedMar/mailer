// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer setup (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '10team.daimapay@gmail.com',       
    pass: 'dose gylo gjpx jzqw',          
  }
});

app.post('api/send-login-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'team.daimapay@gmail.com', 
    subject: `Support Message from ${name}`,
    text: message,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

/*app.post('api/send-failed-transactions', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'team.daimapay@gmail.com', 
    subject: `Support Message from ${name}`,
    text: message,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});*/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
