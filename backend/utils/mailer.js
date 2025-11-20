import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Check if Gmail is configured
const isGmailConfigured = process.env.EMAIL_USER && 
                          process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                          process.env.EMAIL_PASSWORD && 
                          process.env.EMAIL_PASSWORD !== 'your-app-password';

let transporter = null;

if (isGmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

export const sendEmail = async (to, subject, text) => {
  // If Gmail is not configured, log to console
  if (!isGmailConfigured) {
    console.log('\n📧 EMAIL (Gmail Not Configured - Logged to Console):');
    console.log('─'.repeat(50));
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text}`);
    console.log('─'.repeat(50) + '\n');
    return;
  }

  try {
    // Send email using Gmail
    await transporter.sendMail({
      from: `IET Connect <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    // Log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('\n📧 EMAIL (Sent via Gmail):');
      console.log('─'.repeat(50));
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${text}`);
      console.log('─'.repeat(50) + '\n');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
