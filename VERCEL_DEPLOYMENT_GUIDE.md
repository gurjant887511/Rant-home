# Vercel Deployment Guide - Rant Home

## Overview
Your application consists of:
- **Frontend**: React app (Vite/React Scripts)
- **Backend**: Express.js API server with MongoDB and Cloudinary integration

---

## Step 1: Prepare Backend for Vercel

### 1.1 Update Backend Configuration

Your `vercel.json` is already configured correctly:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### 1.2 Backend Environment Variables

Create a `.env.example` file in backend directory with required variables:

```
MONGODB_URI=your_mongodb_atlas_uri_here
PORT=8000
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 1.3 Set Environment Variables on Vercel

Go to Vercel Dashboard → Settings → Environment Variables and add:

| Variable | Value | 
|----------|-------|
| MONGODB_URI | Get from MongoDB Atlas |
| CLOUDINARY_CLOUD_NAME | From Cloudinary Dashboard |
| CLOUDINARY_API_KEY | From Cloudinary Dashboard |
| CLOUDINARY_API_SECRET | From Cloudinary Dashboard |
| NODE_ENV | production |

---

## Step 2: Prepare Frontend for Vercel

### 2.1 Update Frontend Environment Variables

Change `frontend/.env` to:

```
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
PORT=3000
```

**Note**: Replace `your-backend-domain` with your actual Vercel backend domain

### 2.2 Create Frontend `.env.example`

```
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
PORT=3000
```

---

## Step 3: Deployment Steps

### 3.1 Deploy Backend First

1. **Push code to GitHub**:
   ```bash
   cd backend
   git add .
   git commit -m "Prepare backend for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Select your GitHub repository
   - Select root directory: `backend`
   - Add Environment Variables (from Step 1.3)
   - Deploy

3. **Note the Backend URL** (e.g., `https://your-app-backend.vercel.app`)

### 3.2 Deploy Frontend

1. **Update Frontend .env** with backend URL from Step 3.1

2. **Push frontend code to GitHub**:
   ```bash
   cd frontend
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

3. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Select your GitHub repository
   - Select root directory: `frontend`
   - No additional env vars needed (already in .env)
   - Deploy

---

## Step 4: Required Setup

### 4.1 MongoDB Atlas Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Use this URI in backend environment variables

### 4.2 Verify Cloudinary Configuration
Your current Cloudinary config:
- Cloud Name: `dhpwlrdif` ✓
- API Key: `668324319918668` ✓
- API Secret: Needs to be added to Vercel env vars

### 4.3 CORS Configuration
Backend already has CORS enabled, but ensure it allows your frontend domain:

Update `backend/server.js` if needed:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Step 5: Troubleshooting

### 5.1 If Backend Can't Connect to MongoDB
- Verify MongoDB URI in Vercel environment variables
- Add Vercel IP to MongoDB Atlas whitelist: `Settings → Network Access → Add Current IP` (use 0.0.0.0/0 for testing)

### 5.2 If Frontend Can't Call Backend
- Verify API URL in frontend .env
- Check browser console for CORS errors
- Ensure backend is deployed and running

### 5.3 If Cloudinary Uploads Fail
- Verify API credentials in Vercel environment variables
- Check Cloudinary upload settings in dashboard

---

## Final Checklist

- [ ] MongoDB Atlas account created and cluster running
- [ ] Backend environment variables set in Vercel
- [ ] Backend deployed to Vercel (note the URL)
- [ ] Frontend .env updated with correct backend API URL
- [ ] Frontend deployed to Vercel
- [ ] Test API calls from frontend to backend
- [ ] Test image uploads to Cloudinary
- [ ] Monitor Vercel logs for any errors

---

## Useful Commands

```bash
# Test backend locally with production env
NODE_ENV=production npm start

# Build frontend for production
npm run build

# Check Vercel logs
vercel logs
```

---

## Need Help?
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Cloudinary: https://cloudinary.com/documentation
