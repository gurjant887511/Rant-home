# Email Verification Setup Guide

यह गाइड आपके RentHub एप्लिकेशन में email verification feature को सेटअप करने के लिए है।

## Features Added

✅ User Signup के बाद Email Verification
✅ 6-digit Verification Code (15 minutes validity)
✅ Resend Code का Option
✅ Login के समय Email Verification Check
✅ Beautiful Email Template
✅ Frontend और Backend दोनों का Integration

---

## Backend Changes

### 1. Updated User Model (`backend/models/User.js`)
नए fields जोड़े गए:
- `isEmailVerified` - Email verified है या नहीं
- `emailVerificationCode` - 6-digit code
- `emailVerificationCodeExpiry` - Code की expiry time (15 minutes)

### 2. Email Service (`backend/config/mailer.js`)
नई file बनाई गई जिसमें:
- Gmail के साथ nodemailer setup
- 6-digit verification code generate करना
- Beautiful HTML email template
- Error handling

### 3. Updated Auth Controller (`backend/controllers/authController.js`)
नए functions:
- `registerUser` - Code generate करके email भेजता है
- `verifyEmail` - Code को verify करता है
- `resendVerificationCode` - दोबारा code भेजता है
- `loginUser` - Email verification check करता है

### 4. Updated Routes (`backend/routes/authRoutes.js`)
नए endpoints:
```
POST /api/auth/register          - User signup (email send होगी)
POST /api/auth/login             - User login (verification check)
POST /api/auth/verify-email      - Email verification
POST /api/auth/resend-verification-code - Code resend करना
```

### 5. Dependencies
`nodemailer` package add किया गया backend/package.json में

---

## Frontend Changes

### 1. New Component (`frontend/src/components/EmailVerification.jsx`)
Email verification का complete form:
- 6-digit code input
- Verify button
- Resend Code button
- Back to Signup button
- Error/Success messages

### 2. Updated Signup Page (`frontend/src/pages/Signup.jsx`)
- Signup के बाद automatic email verification screen show होता है
- User को registration success दिखता है
- Email verification में code डालना होता है

### 3. Updated Login Page (`frontend/src/pages/Login.jsx`)
- अगर email verified नहीं है तो verification screen दिखता है
- User को verify करके login कर सकते हैं

---

## Configuration Steps

### Step 1: Gmail App Password Generate करें
1. अपने Gmail account पर जाएं: https://myaccount.google.com
2. Left sidebar में "Security" पर क्लिक करें
3. Two-factor authentication enable करें (अगर enabled नहीं है)
4. Security settings में "App passwords" ढूंढें
5. "Mail" और "Windows Computer" select करें
6. 16-character password generate होगी
7. यह password copy करें

### Step 2: Backend .env File बनाएं

```bash
# backend/.env file create करें या update करें
GMAIL_USER=renthub.ranthome@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=8000
NODE_ENV=development
```

### Step 3: Backend Dependencies Install करें

```bash
cd backend
npm install
```

### Step 4: Backend Server Start करें

```bash
# Development mode
npm run dev

# या Production
npm start
```

Server को http://localhost:8000 पर run होना चाहिए

### Step 5: Frontend Start करें

```bash
cd frontend
npm install
npm run dev
```

---

## How It Works

### Signup Flow
1. User अपनी details भरता है (Name, Email, Password)
2. Backend पर registration request जाता है
3. Backend 6-digit code generate करता है
4. Code 15 minutes के लिए database में save होता है
5. Gmail से verification code email भेजी जाती है
6. Frontend automatically Email Verification screen दिखाता है
7. User को email में code मिलता है
8. User code डालता है
9. Verify होने के बाद token generate होता है
10. User को home page पर redirect किया जाता है

### Login Flow
1. User email और password डालता है
2. Backend credentials check करता है
3. अगर email verified नहीं है:
   - 403 error response करता है
   - Frontend email verification screen दिखाता है
4. Email verify होने के बाद token मिलता है
5. User को home page पर redirect किया जाता है

### Resend Code Flow
1. User अगर code expire हो गया हो तो "Resend Code" दबाता है
2. Backend नया code generate करता है
3. नया code email पर भेजा जाता है
4. User नया code डाल सकता है

---

## API Response Examples

### Register Success
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "requiresEmailVerification": true
  }
}
```

### Verify Email Success
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": true,
    "token": "jwt_token_here"
  }
}
```

### Login with Unverified Email
```json
{
  "success": false,
  "message": "Please verify your email first",
  "data": {
    "email": "john@example.com",
    "requiresEmailVerification": true
  }
}
```

---

## Troubleshooting

### Problem: "Failed to send verification email"
**Solution:**
- Check Gmail App Password correctly entered है
- Two-factor authentication enable है
- App passwords enabled है Gmail में

### Problem: "Invalid verification code"
**Solution:**
- Code 15 minutes में expire हो जाता है
- "Resend Code" button से नया code request करें
- Whitespace न हो code के साथ

### Problem: Backend email भेज नहीं रहा
**Solution:**
```bash
# nodemailer install करें
npm install nodemailer

# .env file check करें
cat .env

# Server restart करें
npm run dev
```

### Problem: CORS Error
**Solution:**
- Frontend और backend URLs correct हैं .env में
- ALLOWED_ORIGINS में frontend URL add करें
- Server restart करें

---

## Testing

### Frontend पर Test करें
1. http://localhost:3000 (या 5173) खोलें
2. "Sign Up" link click करें
3. Form भरें और submit करें
4. Email verification screen दिखेगा
5. Gmail account में code check करें
6. Code enter करें और verify करें
7. Home page पर redirect होगा

### Login Test करें
1. Verified user से login करें - काम करेगा
2. Unverified user से login करें - verification screen दिखेगा

---

## Security Notes

✅ Codes 15 minutes में expire हो जाते हैं
✅ Database में codes stored हैं (production में हashing add करें)
✅ JWT tokens 30 days valid हैं
✅ Passwords bcrypt से hashed हैं
✅ Email case-insensitive check किया जाता है

---

## Future Enhancements

🔄 OTP के बजाय email link भेजना
📱 SMS verification
🔐 Email verification की जरूरत छोड़ना (auto-verify)
⏰ Code expiry को configurable बनाना
📧 Email templates को database में store करना

---

**Questions या Issues हैं तो contact करें!** ✨
