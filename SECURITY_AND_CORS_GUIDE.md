# CORS and Security Configuration Guide

## 1. Update Backend CORS for Production

Your backend currently accepts requests from all origins. For production, update `backend/server.js`:

### Current Configuration (Development):
```javascript
app.use(cors());
```

### Recommended Production Configuration:
```javascript
const allowedOrigins = [
  'https://your-frontend-domain.vercel.app',
  'http://localhost:3000' // for local testing
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

**Update this after deploying frontend to Vercel**

---

## 2. Security Best Practices

### Never Commit Sensitive Data
✓ Already done - `.env` files are for local use only
✓ Keep `.env.example` without real credentials
✓ Use Vercel environment variables for production secrets

### Protect Your API Secret
Your Cloudinary API Secret is currently exposed in:
- `backend/.env` (local)
- `backend/config/cloudinary.js` (uses env variables)

This is safe because:
1. `.env` is not committed to GitHub
2. Vercel environment variables are encrypted
3. API is protected by backend server

---

## 3. MongoDB Atlas Security

After creating your cluster, secure it:

1. **Network Access**
   - Go to: MongoDB Atlas → Network Access
   - For development: Add `0.0.0.0/0` (allow all)
   - For production: Add specific Vercel IP ranges

2. **Database User**
   - Create a database user with strong password
   - Use this in connection string

3. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/rental-app?retryWrites=true&w=majority
   ```

---

## 4. Cloudinary Security

Your Cloudinary setup:
- ✓ Cloud Name: Public (safe)
- ✓ API Key: Public (safe)
- ✗ API Secret: **NEVER expose client-side**

The secret is correctly stored in backend environment variables only ✓

---

## 5. Frontend API Calls

Your `frontend/services/api.js` correctly:
- ✓ Uses environment variables for API URL
- ✓ Sends authorization tokens when available
- ✓ Never exposes sensitive data

No changes needed!

---

## 6. Environment Variables Checklist

### Backend (Keep these secret in Vercel):
- [ ] MONGODB_URI
- [ ] CLOUDINARY_API_SECRET
- [ ] NODE_ENV = production

### Frontend (Safe to expose):
- [ ] REACT_APP_API_URL (will be different per environment)

### Both (Public information):
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY

---

## 7. Production Deployment Checklist

- [ ] All sensitive data in Vercel environment variables (not in code)
- [ ] `.env` files not committed to GitHub
- [ ] `.env.example` exists with template
- [ ] Frontend REACT_APP_API_URL points to deployed backend
- [ ] CORS whitelist updated with frontend domain
- [ ] MongoDB Atlas has Vercel IP whitelisted
- [ ] Cloudinary credentials verified in Vercel
- [ ] Both frontend and backend deployed successfully

---

## 8. Monitoring and Logs

### Check Vercel Logs:
```bash
vercel logs --follow
```

### Monitor Backend Errors:
1. Vercel Dashboard → Deployments → Backend
2. Click "Logs" tab
3. Look for MongoDB or Cloudinary connection errors

### Check Frontend Errors:
1. Vercel Dashboard → Deployments → Frontend
2. Browser console (DevTools → Console)
3. Network tab for API call failures

---

## Ready to Deploy! 🚀

Once you complete all steps in `DEPLOYMENT_QUICK_START.md`, your application will be:
- ✓ Secure (sensitive data protected)
- ✓ Scalable (MongoDB Atlas)
- ✓ Production-ready (Vercel)
- ✓ Connected (Frontend ↔ Backend)
