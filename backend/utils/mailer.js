import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

// Check if Resend is configured
const isResendConfigured = process.env.RESEND_API_KEY && 
                           process.env.RESEND_API_KEY !== 'your-resend-api-key';

// Initialize Resend client
let resend = null;
if (isResendConfigured) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend initialized successfully');
} else {
  console.warn('⚠️ WARNING: RESEND_API_KEY not configured in .env file');
}

export const sendEmail = async (to, subject, text, html = null) => {
  const fromEmail = process.env.FROM_EMAIL || "IET Connect <no-reply@iet-connect.online>"

  
  // Check if Resend is configured
  if (!isResendConfigured) {
    console.error('\n❌ EMAIL ERROR: Resend is not configured!');
    console.error('─'.repeat(50));
    console.error('Please add RESEND_API_KEY to your .env file');
    console.error('Get your API key from: https://resend.com/api-keys');
    console.error('─'.repeat(50) + '\n');
    throw new Error('Email service not configured');
  }

  try {
    const emailData = {
      from: fromEmail,
      to: [to],
      subject,
      text,
    };

    // Add HTML if provided
    if (html) {
      emailData.html = html;
    }

    console.log('\n📧 Attempting to send email via Resend...');
    console.log('─'.repeat(50));
    console.log(`From: ${fromEmail}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('─'.repeat(50));

    const result = await resend.emails.send(emailData);
    
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log('─'.repeat(50));
    console.log(`Email ID: ${result.data?.id || 'N/A'}`);
    console.log(`Status: Delivered to Resend`);
    console.log('─'.repeat(50) + '\n');
    
    return result;
  } catch (error) {
    console.error('\n❌ EMAIL SEND FAILED!');
    console.error('─'.repeat(50));
    console.error(`Error: ${error.message}`);
    console.error(`Error Name: ${error.name}`);
    
    // Check for common errors
    if (error.message.includes('domain')) {
      console.error('\n🔴 DOMAIN ERROR:');
      console.error('Your domain "iet-connect.online" is not verified in Resend.');
      console.error('\nTo fix this:');
      console.error('1. Go to: https://resend.com/domains');
      console.error('2. Add these DNS records to your domain:');
      console.error('   - MX record: feedback-smtp.us-east-1.amazonses.com (Priority: 10)');
      console.error('   - TXT record for SPF: v=spf1 include:amazonses.com ~all');
      console.error('3. Wait 5-30 minutes for DNS propagation');
      console.error('4. Click "Verify" in Resend dashboard');
    } else if (error.message.includes('API key')) {
      console.error('\n� API KEY ERROR:');
      console.error('Your Resend API key is invalid.');
      console.error('Get a new one from: https://resend.com/api-keys');
    }
    
    console.error('─'.repeat(50) + '\n');
    throw error;
  }
};

// Email template for password reset OTP
export const getResetPasswordEmailHTML = (resetCode) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    
                    <!-- Header with gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0FB8AD 0%, #0a9d94 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">
                                🔐 IET Connect
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0f7f5; font-size: 16px;">
                                Password Reset Request
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 22px; font-weight: 600;">
                                Hello there! 👋
                            </h2>
                            <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password for your IET Connect account. Use the verification code below to proceed with resetting your password.
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #f0fdfc 0%, #e6f7f6 100%); border: 2px solid #0FB8AD; border-radius: 12px; padding: 30px; display: inline-block;">
                                            <p style="margin: 0 0 10px 0; color: #0a9d94; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                                Your Verification Code
                                            </p>
                                            <h1 style="margin: 0; color: #0FB8AD; font-size: 42px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                                ${resetCode}
                                            </h1>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background-color: #fff8e1; border-left: 4px solid #ffc107; border-radius: 8px; padding: 16px 20px; margin: 25px 0;">
                                <p style="margin: 0; color: #f57c00; font-size: 14px; line-height: 1.6;">
                                    ⚠️ <strong>Important:</strong> This code will expire in <strong>10 minutes</strong>. If you didn't request this, please ignore this email and your password will remain unchanged.
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0 0 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                If you have any questions or need assistance, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 10px 0; color: #718096; font-size: 14px;">
                                Best regards,<br>
                                <strong style="color: #0FB8AD;">The IET Connect Team</strong>
                            </p>
                            <p style="margin: 15px 0 0 0; color: #a0aec0; font-size: 12px;">
                                © ${new Date().getFullYear()} IET Connect. All rights reserved.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">
                                Your Academic Resource Hub 📚
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
