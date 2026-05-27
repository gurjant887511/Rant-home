const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

// Set SendGrid API Key (if configured)
const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_KEY && SENDGRID_KEY !== 'YOUR_SENDGRID_API_KEY') {
  sgMail.setApiKey(SENDGRID_KEY);
}

// Debug: Log environment variables
console.log('📧 Mailer Configuration:');
console.log('SENDGRID_API_KEY:', SENDGRID_KEY && SENDGRID_KEY !== 'YOUR_SENDGRID_API_KEY' ? 'Set ✓' : 'Not Set / Placeholder ✗');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set ✓' : 'Not Set ✗');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set ✓' : 'Not Set ✗');
console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL ? 'Set ✓' : 'Not Set ✗');

// Generate verification code (6 digits)
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create reusable HTML email template
const createEmailHTML = (code, name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
      <h2 style="color: #333; margin-bottom: 20px;">Welcome to RentHub!</h2>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Hi ${name},
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Thank you for signing up. Please verify your email address using the code below:
      </p>
      
      <div style="background-color: #fff; border: 2px solid #007bff; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 24px; font-weight: bold; color: #007bff; letter-spacing: 2px; margin: 0;">
          ${code}
        </p>
      </div>
      
      <p style="color: #555; font-size: 14px; line-height: 1.6;">
        This code will expire in 15 minutes. If you didn't request this, please ignore this email.
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #999; font-size: 12px; text-align: center;">
        © 2025 RentHub. All rights reserved.
      </p>
    </div>
  </div>
`;

/**
 * Send email via Gmail SMTP (Nodemailer)
 */
const sendViaGmailSMTP = async (to, subject, html) => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error('Gmail SMTP credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword
    }
  });

  const mailOptions = {
    from: `"RentHub" <${gmailUser}>`,
    to,
    subject,
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent successfully via Gmail SMTP');
  console.log('Message ID:', info.messageId);
  return info;
};

/**
 * Send email via SendGrid
 */
const sendViaSendGrid = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL || 'renthub.ranthome@gmail.com',
    subject,
    html
  };

  const result = await sgMail.send(msg);
  console.log('✅ Email sent successfully via SendGrid');
  console.log('Response:', result[0].statusCode);
  return result;
};

// Send verification email (tries Gmail SMTP first, then SendGrid as fallback)
const sendVerificationEmail = async (email, code, name) => {
  try {
    console.log(`📧 Attempting to send email to: ${email}`);
    
    const htmlContent = createEmailHTML(code, name);
    const subject = 'Email Verification - RentHub';

    let sent = false;
    let lastError = null;

    // Strategy 1: Try Gmail SMTP first (more reliable with configured credentials)
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (gmailUser && gmailAppPassword) {
      try {
        await sendViaGmailSMTP(email, subject, htmlContent);
        sent = true;
      } catch (gmailError) {
        console.warn('⚠️ Gmail SMTP failed:', gmailError.message);
        lastError = gmailError;
      }
    }

    // Strategy 2: Try SendGrid as fallback (if configured)
    if (!sent && SENDGRID_KEY && SENDGRID_KEY !== 'YOUR_SENDGRID_API_KEY') {
      try {
        await sendViaSendGrid(email, subject, htmlContent);
        sent = true;
      } catch (sgError) {
        console.warn('⚠️ SendGrid failed:', sgError.message);
        lastError = sgError;
        if (sgError.response) {
          console.error('SendGrid Error Details:', sgError.response.body);
        }
      }
    }

    if (!sent) {
      // If both methods failed, try Gmail one more time with a specific error message
      throw new Error(lastError?.message || 'All email sending methods failed');
    }

    return { success: true, message: 'Verification email sent' };
  } catch (error) {
    console.error('❌ Error sending verification email:', error.message);
    return { 
      success: false, 
      message: 'Failed to send verification email. Please try again later or contact support.', 
      error: error.message 
    };
  }
};

module.exports = {
  generateVerificationCode,
  sendVerificationEmail
};
