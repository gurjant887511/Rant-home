const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateVerificationCode, sendVerificationEmail } = require('../config/mailer');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Create user with lowercase email
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      emailVerificationCode: verificationCode,
      emailVerificationCodeExpiry: codeExpiry,
      isEmailVerified: false
    });

    console.log('✅ User created:', user._id);

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode, name);
    
    if (!emailResult.success) {
      console.warn('⚠️ Email send failed:', emailResult.error);
      return res.status(500).json({ 
        success: false, 
        message: 'User created but failed to send verification email. Please check your email configuration.',
        error: emailResult.error 
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        requiresEmailVerification: true
      }
    });
  } catch (error) {
    console.error('❌ Registration Error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error registering user', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Verify email with code
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Please provide email and verification code' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    // Check if code is correct and not expired
    if (user.emailVerificationCode !== code) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (new Date() > user.emailVerificationCodeExpiry) {
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please sign up again.' });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    user.emailVerificationCodeExpiry = null;
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '30d' });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        token
      }
    });
  } catch (error) {
    console.error('❌ Email verification error:', error);
    res.status(500).json({ success: false, message: 'Error verifying email', error: error.message });
  }
};

// Resend verification code
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    user.emailVerificationCode = verificationCode;
    user.emailVerificationCodeExpiry = codeExpiry;
    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode, user.name);
    
    if (!emailResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to resend verification email',
        error: emailResult.error 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error resending verification code', error: error.message });
  }
};


// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is locked out
    if (user.loginLockoutUntil && user.loginLockoutUntil > new Date()) {
      const remainingTime = Math.ceil((user.loginLockoutUntil - new Date()) / 1000);
      
      // Determine lockout duration name
      let lockoutDuration = '30 seconds';
      if (user.lockoutLevel === 2) lockoutDuration = '2 minutes';
      else if (user.lockoutLevel === 3) lockoutDuration = '5 minutes';
      else if (user.lockoutLevel >= 4) lockoutDuration = '15 minutes';
      
      return res.status(429).json({ 
        success: false, 
        message: `Too many failed attempts. Account locked for ${lockoutDuration}. Try again in ${remainingTime} seconds.`,
        remainingTime,
        lockoutLevel: user.lockoutLevel
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      // Increment failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      user.lastFailedAttemptTime = new Date();

      // If 3 failed attempts, lock the account based on lockout level
      if (user.failedLoginAttempts >= 3) {
        // Calculate lockout duration based on level
        let lockoutDurationMs = 30 * 1000; // Level 1: 30 seconds
        let nextLevel = (user.lockoutLevel || 0) + 1;
        
        if (nextLevel === 2) {
          lockoutDurationMs = 2 * 60 * 1000; // Level 2: 2 minutes
        } else if (nextLevel === 3) {
          lockoutDurationMs = 5 * 60 * 1000; // Level 3: 5 minutes
        } else if (nextLevel >= 4) {
          lockoutDurationMs = 15 * 60 * 1000; // Level 4+: 15 minutes
        }

        user.loginLockoutUntil = new Date(Date.now() + lockoutDurationMs);
        user.lockoutLevel = nextLevel;
        user.failedLoginAttempts = 0; // Reset attempt counter for next cycle

        await user.save();

        const remainingSeconds = Math.ceil(lockoutDurationMs / 1000);
        let lockoutMessage = `Too many failed attempts. Account locked for ${remainingSeconds} seconds.`;
        
        if (nextLevel === 2) lockoutMessage = `Too many failed attempts. Account locked for 2 minutes.`;
        else if (nextLevel === 3) lockoutMessage = `Too many failed attempts. Account locked for 5 minutes.`;
        else if (nextLevel >= 4) lockoutMessage = `Too many failed attempts. Account locked for 15 minutes.`;

        return res.status(429).json({ 
          success: false, 
          message: lockoutMessage,
          remainingTime: remainingSeconds,
          lockoutLevel: nextLevel
        });
      }

      await user.save();
      const attemptsRemaining = 3 - user.failedLoginAttempts;
      return res.status(401).json({ 
        success: false, 
        message: `Invalid credentials. ${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining before lockout.`,
        attemptsRemaining,
        failedAttempts: user.failedLoginAttempts
      });
    }

    // Reset failed attempts and lockout on successful login
    user.failedLoginAttempts = 0;
    user.loginLockoutUntil = null;
    user.lockoutLevel = 0;
    user.lastFailedAttemptTime = null;

    // Check if email is verified
    if (!user.isEmailVerified) {
      await user.save(); // Save the reset fields
      return res.status(403).json({ 
        success: false, 
        message: 'Please verify your email first',
        data: { email: user.email, requiresEmailVerification: true }
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '30d' });

    await user.save(); // Save the reset fields

    res.status(200).json({ 
      success: true, 
      message: 'Logged in successfully', 
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        token 
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};