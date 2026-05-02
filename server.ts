import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Setup multer for memory storage (good for small/medium attachments)
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter
// You should configure your .env file with EMAIL_USER and EMAIL_PASS
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', upload.single('attachment'), async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;
    const file = req.file;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@pvgus.com',
      to: 'info@pvgus.com', // Sending to the requested email
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message}
      `,
      attachments: file ? [
        {
          filename: file.originalname,
          content: file.buffer,
        }
      ] : [],
    };

    // If no credentials are provided in .env, we just mock the success for beginner-friendly testing
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('--- Mock Email Submission ---');
      console.log(mailOptions);
      console.log('-----------------------------');
      console.log('To send real emails, configure EMAIL_USER and EMAIL_PASS in your .env file.');
      return res.status(200).json({ success: true, message: 'Message "sent" successfully (mocked).' });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
