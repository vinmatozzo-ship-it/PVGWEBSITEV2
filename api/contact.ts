import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Disable Vercel's default body parser so multer can parse raw multipart stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to run middleware in serverless environment
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Run the multer middleware to parse request body and attachment file
    await runMiddleware(req, res, upload.single('attachment'));

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
      to: process.env.CONTACT_RECEIVER_EMAIL || 'info@pvgus.com',
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

    // If no credentials are provided, mock the success for testing
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('--- Mock Email Submission ---');
      console.log(mailOptions);
      console.log('-----------------------------');
      console.log('To send real emails, configure EMAIL_USER and EMAIL_PASS in your environment.');
      return res.status(200).json({ success: true, message: 'Message "sent" successfully (mocked).' });
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}
