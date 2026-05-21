# Email Verification - Quick Setup Checklist

Follow these steps to enable email verification in your RentHub app:

## ✅ Step 1: Get Gmail App Password (2 min)
- [ ] Open https://myaccount.google.com
- [ ] Click "Security" in sidebar
- [ ] Enable "2-Step Verification" if not already enabled
- [ ] Find "App passwords" option
- [ ] Select "Mail" and "Windows Computer"
- [ ] Copy the 16-character password
- [ ] Save it for Step 3

## ✅ Step 2: Update Backend Dependencies (1 min)
```bash
cd backend
npm install
```
This installs `nodemailer` which is already added to package.json

## ✅ Step 3: Create .env File in Backend (2 min)
Create or update `backend/.env` file:
```
GMAIL_USER=renthub.ranthome@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
NODE_ENV=development
```

## ✅ Step 4: Start Backend Server (1 min)
```bash
cd backend
npm run dev
```
Server should run on http://localhost:8000

## ✅ Step 5: Install Frontend Dependencies (1 min)
```bash
cd frontend
npm install
```

## ✅ Step 6: Start Frontend (1 min)
```bash
cd frontend
npm run dev
```
Frontend should run on http://localhost:3000 or http://localhost:5173

## ✅ Step 7: Test Email Verification (5 min)
1. Open http://localhost:3000 (or your frontend URL)
2. Click "Sign Up"
3. Fill in the form:
   - Name: Your Name
   - Email: Your Email Address
   - Password: Your Password
   - Confirm Password: Same Password
4. Click "Sign Up"
5. You should see "Email Verification" screen
6. Check your email for verification code
7. Enter the 6-digit code
8. Click "Verify Email"
9. You should be redirected to home page ✨

## 🔧 If Something Doesn't Work

### Email not receiving?
- Check spam/junk folder
- Verify app password is correct (no spaces in wrong places)
- Make sure 2FA is enabled on Gmail account
- Check server logs for errors: `npm run dev`

### Backend not running?
```bash
# Kill any process on port 8000
# Then restart
npm run dev
```

### Frontend not connecting?
- Check that API URL is correct
- Make sure backend is running first
- Check browser console for errors (F12)

### Verification code not working?
- Code expires after 15 minutes
- Click "Resend Code" for a new one
- Make sure no extra spaces in code

## 📝 Files Modified/Created

### Backend
- ✅ `backend/models/User.js` - Added email verification fields
- ✅ `backend/config/mailer.js` - NEW email service file
- ✅ `backend/controllers/authController.js` - Updated auth logic
- ✅ `backend/routes/authRoutes.js` - Added new endpoints
- ✅ `backend/package.json` - Added nodemailer dependency
- ✅ `backend/.env.example` - Updated with email config

### Frontend
- ✅ `frontend/src/components/EmailVerification.jsx` - NEW verification component
- ✅ `frontend/src/components/EmailVerification.css` - NEW styles
- ✅ `frontend/src/pages/Signup.jsx` - Updated with verification flow
- ✅ `frontend/src/pages/Login.jsx` - Updated with verification check

## 🚀 What Now Works

1. ✅ User Signup → Email Code Sent → Email Verified → Login
2. ✅ Email Code Resend if expired
3. ✅ Login blocked until email verified
4. ✅ Beautiful email with verification code
5. ✅ 15-minute code expiry
6. ✅ Error handling throughout

## 🎯 Next Steps (Optional)

- [ ] Setup password reset functionality
- [ ] Add "Remember me" on login
- [ ] Setup email notification templates
- [ ] Add admin panel for user management
- [ ] Enable social login (Google, Facebook)

---

**Questions?** Check `EMAIL_VERIFICATION_SETUP.md` for detailed documentation!

**Need help?** The setup guide has troubleshooting section! 📚
