const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Debug: Log environment variables
console.log('SendGrid Config Check:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set ✓' : 'Not Set ✗');
console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL ? 'Set ✓' : 'Not Set ✗');

// Generate verification code (6 digits)
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email using SendGrid
const sendVerificationEmail = async (email, code, name) => {
  try {
    console.log(`📧 Attempting to send email to: ${email}`);
    
    const htmlContent = `
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

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL || 'renthub.ranthome@gmail.com',
      subject: 'Email Verification - RentHub',
      html: htmlContent
    };

    const result = await sgMail.send(msg);
    console.log('✅ Email sent successfully via SendGrid');
    console.log('Response:', result[0].statusCode);
    return { success: true, message: 'Verification email sent' };
  } catch (error) {
    console.error('❌ Error sending email via SendGrid:', error.message);
    if (error.response) {
      console.error('SendGrid Error:', error.response.body);
    }
    return { success: false, message: 'Failed to send verification email', error: error.message };
  }
};

module.exports = {
  generateVerificationCode,
  sendVerificationEmail
};
